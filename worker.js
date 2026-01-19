export default {
  async fetch(req) {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) return new Response("No code", { status: 400 });

    const data = new URLSearchParams();
    data.append("client_id", "1462867856919101564");
    data.append("client_secret", "l91AFU-Uim64p-F_TayhpimGpnBQVwJ7");
    data.append("grant_type", "authorization_code");
    data.append("code", code);
    data.append("redirect_uri", "https://your-pages-url.pages.dev/auth/callback");
    data.append("scope", "identify guilds");

    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: data
    });

    const tokenJson = await tokenRes.json();
    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokenJson.access_token}` }
    });

    const user = await userRes.json();
    return new Response(JSON.stringify(user), { status: 200 });
  }
};
