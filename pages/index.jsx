import Head from "next/head";
import { useEffect } from "react";
import fs from "fs";
import path from "path";
import { serialize } from "cookie";
import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl } from "../lib/supabase-config";

export default function Home({ appMarkup, initialState }) {
  useEffect(() => {
    window.__CODECALENDAR_INITIAL_STATE__ = initialState;
    window.__CODECALENDAR_SUPABASE_CLIENT__ = createBrowserClient(supabaseUrl, supabaseAnonKey);
    if (!window.__CODECALENDAR_APP_LOADED__) {
      window.__CODECALENDAR_APP_LOADED__ = true;
      import("../data/calendar-data.js").then(() => import("../app.js"));
    }
  }, [initialState]);

  return (
    <>
      <Head>
        <title>CodeCalendar</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: appMarkup }} />
    </>
  );
}

export async function getServerSideProps(context) {
  const html = fs.readFileSync(path.join(process.cwd(), "index.html"), "utf8");
  const appMarkup = html
    .match(/<body[^>]*>([\s\S]*)<\/body>/i)[1]
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .trim();

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return Object.entries(context.req.cookies).map(([name, value]) => ({ name, value }));
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          appendSetCookie(context.res, serialize(name, value, { ...options, path: options?.path || "/" }));
        });
      }
    }
  });
  const {
    data: { user }
  } = await supabase.auth.getUser();

  let registered = [];
  if (user) {
    const { data, error } = await supabase.from("user_events").select("event_id").eq("user_id", user.id);
    if (!error) registered = data.map((row) => row.event_id);
  }

  return {
    props: {
      appMarkup,
      initialState: {
        user: user
          ? {
              id: user.id,
              email: user.email || "",
              user_metadata: user.user_metadata || {}
            }
          : null,
        registered
      }
    }
  };
}

function appendSetCookie(res, cookie) {
  const current = res.getHeader("Set-Cookie");
  if (!current) {
    res.setHeader("Set-Cookie", cookie);
    return;
  }
  res.setHeader("Set-Cookie", Array.isArray(current) ? [...current, cookie] : [current, cookie]);
}
