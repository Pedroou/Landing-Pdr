# Cover letters

A page that writes a cover letter from a fixed template. You can fill in the blanks by hand, or let Claude Code fill them in from a job listing. For a question on an application form, pick **Short answer**: Claude Code looks up how recruiters recommend answering that kind of question, then writes the answer from Pedro's CV and projects.

## What you need

A paid Claude plan (Pro, Max, Team or Enterprise). The free plan doesn't include Claude Code, which fills in the letter.

You don't have to install anything yourself. The first time, the launcher below installs what's missing: Node.js, then Claude Code (the Claude desktop app's copy is used if it has one). Then it opens Claude's sign-in in your browser.

Without a paid plan the page works the same; only the button that fills it in with AI doesn't.

## First time

1. Right-click the `.zip` and choose **Extract All**. Don't open anything from inside the `.zip` before extracting it.
2. In the extracted folder, double-click `Start cover letter helper.cmd`.
   - If Windows shows **Windows protected your PC**, click **More info**, then **Run anyway**.
   - A black window opens. The first time, it installs Node.js and Claude Code, which takes a few minutes; if Windows asks for permission, click **Yes**.
   - Then the page opens in your browser, and a second tab asks you to sign in to Claude. Sign in, then go back to the page.
   - Keep the black window open while you use the page; close it to stop.
3. On the page, **Fill with AI** fills in the letter from a job listing (Claude Code does the work). With **Short answer** selected, it asks for the question instead and writes the answer.

## Next times

Double-click `cover-letter.html` and use the **Start the helper** button. The first time, the browser asks whether it can open "Cover letter helper": tick the box to always allow it.

## Only filling it in by hand?

Double-clicking `cover-letter.html` is enough; you don't need anything else. Short answers are the exception: Claude writes them, so they need the helper.
