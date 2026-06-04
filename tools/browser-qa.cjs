const { spawn } = require("child_process");
const path = require("path");

const root = path.resolve(__dirname, "..");
const isWindows = process.platform === "win32";
const binExt = isWindows ? ".cmd" : "";
const port = Number(process.env.QA_PORT ?? process.env.PORT ?? 3100);
const baseURL = process.env.QA_BASE_URL ?? `http://127.0.0.1:${port}`;
const extraArgs = process.argv.slice(2);

const nextBin = path.join(root, "node_modules", ".bin", `next${binExt}`);
const playwrightBin = path.join(
  root,
  "node_modules",
  ".bin",
  `playwright${binExt}`
);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const waitForServer = async (url) => {
  const deadline = Date.now() + 120_000;
  let lastError;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.status < 500) {
        return;
      }
    } catch (error) {
      lastError = error;
    }

    await delay(1_000);
  }

  throw lastError ?? new Error(`Timed out waiting for ${url}`);
};

const stopProcessTree = async (child) => {
  if (!child || child.killed) {
    return;
  }

  child.stdout?.destroy();
  child.stderr?.destroy();
  child.stdin?.destroy();

  if (isWindows) {
    await new Promise((resolve) => {
      const killer = spawn(
        "taskkill",
        ["/PID", String(child.pid), "/T", "/F"],
        { stdio: "ignore" }
      );
      killer.on("close", resolve);
      killer.on("error", resolve);
    });
    child.kill();
    child.unref();
    return;
  }

  child.kill("SIGTERM");
  child.unref();
};

const run = async () => {
  let server;
  let exitCode = 1;

  try {
    if (!process.env.QA_BASE_URL) {
      server = spawn(
        nextBin,
        ["dev", "--hostname", "127.0.0.1", "--port", String(port)],
        {
          cwd: root,
          env: { ...process.env, PORT: String(port) },
          shell: isWindows,
          stdio: ["ignore", "pipe", "pipe"],
          windowsHide: true,
        }
      );

      server.stdout.on("data", (chunk) => {
        process.stdout.write(`[qa-server] ${chunk}`);
      });
      server.stderr.on("data", (chunk) => {
        process.stderr.write(`[qa-server] ${chunk}`);
      });

      await waitForServer(baseURL);
    }

    exitCode = await new Promise((resolve, reject) => {
      const playwright = spawn(playwrightBin, ["test", ...extraArgs], {
        cwd: root,
        env: { ...process.env, QA_BASE_URL: baseURL },
        shell: isWindows,
        stdio: "inherit",
        windowsHide: true,
      });

      playwright.on("error", reject);
      playwright.on("close", resolve);
    });
  } finally {
    await stopProcessTree(server);
  }

  process.exit(exitCode ?? 1);
};

run().catch(async (error) => {
  console.error(error);
  process.exit(1);
});
