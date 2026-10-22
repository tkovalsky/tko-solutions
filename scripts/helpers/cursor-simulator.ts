import type { Locator, Page } from "playwright";

export async function installCursor(page: Page) {
  await page.evaluate(() => {
    if (document.getElementById("playwright-mock-cursor")) return;
    const cursor = document.createElement("div");
    cursor.id = "playwright-mock-cursor";
    cursor.setAttribute("aria-hidden", "true");
    cursor.style.cssText = "position:fixed;left:80px;top:100px;width:24px;height:30px;z-index:2147483647;pointer-events:none;filter:drop-shadow(0 2px 3px #0009)";
    cursor.innerHTML = '<svg viewBox="0 0 24 30" width="24" height="30"><path d="M2 2v23l6-6 5 10 4-2-5-10h9z" fill="white" stroke="#18181b" stroke-width="2"/></svg>';
    document.body.append(cursor);
  });
}

export async function updateCaption(page: Page, text: string) {
  await page.evaluate((caption) => {
    let banner = document.getElementById("playwright-caption");
    if (!banner) {
      banner = document.createElement("div");
      banner.id = "playwright-caption";
      banner.setAttribute("aria-hidden", "true");
      banner.style.cssText = "position:fixed;bottom:38px;left:50%;transform:translateX(-50%);z-index:2147483646;pointer-events:none;max-width:90vw;padding:14px 26px;border:1px solid #52525b;border-radius:999px;background:rgba(24,24,27,.95);color:white;font:500 20px/1.4 ui-monospace,monospace;text-align:center;box-shadow:0 12px 40px #0007";
      document.body.append(banner);
    }
    banner.textContent = caption;
  }, text);
}

export async function scrollTo(page: Page, target: Locator, offset = 120) {
  await target.waitFor({ state: "visible" });
  await target.evaluate((element, topOffset) => new Promise<void>((resolve) => {
    const top = Math.min(document.documentElement.scrollHeight - innerHeight, Math.max(0, element.getBoundingClientRect().top + scrollY - topOffset));
    window.scrollTo({ top, behavior: "smooth" });
    const started = performance.now();
    const animation = { inspect() {
      if (Math.abs(scrollY - top) < 2 || performance.now() - started > 2000) resolve();
      else requestAnimationFrame(animation.inspect);
    } };
    requestAnimationFrame(animation.inspect);
  }), offset);
  await page.waitForTimeout(300);
}

export async function moveTo(page: Page, target: Locator) {
  await target.waitFor({ state: "visible" });
  let box = await target.boundingBox();
  if (!box) throw new Error("Cursor target has no visible bounds");
  if (box.y < 100 || box.y + box.height > 930) {
    await scrollTo(page, target, 260);
    box = await target.boundingBox();
  }
  if (!box) throw new Error("Cursor target disappeared");
  const destination = { x: box.x + box.width / 2, y: box.y + Math.min(box.height / 2, 50) };
  await page.evaluate(({ x, y }) => new Promise<void>((resolve) => {
    const cursor = document.getElementById("playwright-mock-cursor")!;
    const fromX = parseFloat(cursor.style.left);
    const fromY = parseFloat(cursor.style.top);
    const started = performance.now();
    const duration = 650;
    const animation = { animate(now: number) {
      const t = Math.min(1, (now - started) / duration);
      const u = 1 - t;
      const curve = { at(a: number, b: number, bend: number) { return u ** 3 * a + 3 * u ** 2 * t * (a + (b - a) * .3 + bend) + 3 * u * t ** 2 * (a + (b - a) * .7 - bend) + t ** 3 * b; } };
      cursor.style.left = `${curve.at(fromX, x, 35)}px`;
      cursor.style.top = `${curve.at(fromY, y, -25)}px`;
      if (t < 1) requestAnimationFrame(animation.animate); else resolve();
    } };
    requestAnimationFrame(animation.animate);
  }), destination);
  await page.mouse.move(destination.x, destination.y);
  await page.waitForTimeout(350);
}

export async function pulse(page: Page) {
  await page.evaluate(() => {
    const cursor = document.getElementById("playwright-mock-cursor")!;
    const ripple = document.createElement("div");
    ripple.style.cssText = `position:fixed;left:${cursor.style.left};top:${cursor.style.top};width:48px;height:48px;margin:-24px;border:3px solid #60a5fa;border-radius:50%;z-index:2147483646;pointer-events:none;background:#3b82f633`;
    document.body.append(ripple);
    const animation = ripple.animate([{ transform: "scale(.2)", opacity: 1 }, { transform: "scale(1.5)", opacity: 0 }], { duration: 650 });
    animation.onfinish = () => ripple.remove();
  });
}

export async function click(page: Page, target: Locator) {
  await moveTo(page, target);
  await pulse(page);
  await target.click();
}

export async function select(page: Page, target: Locator, value: string) {
  await moveTo(page, target);
  await pulse(page);
  await target.selectOption(value);
}
