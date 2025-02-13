# Duolingo Diary Chrome Extension

## Overview
Duolingo Diary is a Chrome extension designed to help users track, review, and convert their Duolingo mistakes into Anki flashcards. This extension features a floating icon for quick mistake capture, a spaced repetition system (SRS), and a modern, transparent UI.

## File Structure

### HTML Files
- **index.html** - The main page of the extension, displaying the homepage UI.
- **diary.html** - The page where users can review their saved mistakes.
- **flshcrd.html** - The page for converting mistakes into Anki-compatible flashcards.
- **popup.html** - The popup interface when interacting with the extension.

### CSS Files
- **diary.css** - Styles for the mistakes diary page.
- **flshcrd.css** - Styles for the flashcard conversion page.
- **global.css** - Global styles used across all pages.
- **style2.css** - Additional styling (possibly a second version of global styles).

### JavaScript Files
- **background.js** - Background script for handling extension events.
- **content.js** - Script injected into Duolingo to capture mistakes.
- **diary.js** - Logic for displaying and managing saved mistakes in the diary.
- **popup.js** - Controls the behavior of the popup interface.
- **srs.js** - Implements the spaced repetition system (SRS) for reviewing mistakes.

### Assets
- **anki.png** - An image used in the Anki dataset converter page.
- **diary.png** - An image related to the diary section.
- **icon-removebg-...** - The extension icon with a transparent background.

### Manifest
- **manifest.json** - The configuration file for the Chrome extension, defining permissions and entry points.

## Features
- **Mistakes Diary** - Store and review language learning mistakes.
- **Anki Dataset Converter** - Convert mistakes into Anki flashcards.
- **Spaced Repetition System** - Reinforce learning with personalized reviews. {still in progress}
- **Quick Save** - Floating icon on Duolingo to capture mistakes instantly.

## Contribution
Feel free to contribute by improving the UI, fixing bugs, or adding new features!

