
## Overview

The pathways project, I like to think, is a sort of 'short-form journalism' partially inspired by the NYTimes long-form journalism pieces and other interactive ‘scroll enhanced’ sites.
A 'Pathway' is a collection of, usually, around 5 or 6 stories or 'modules'. Each module is made up of panels, each of these being, in effect, a chapter or scene of the story.

A full Pathway is defined by an Introduction page, an assumed 6 stories/modules and then a credits page.

A module is defined by an introductory start panel, followed a sequence of 1 or more panels which ‘fix’ to the screen and cross fade between each other and trigger actions, then end with the library layer and teaser for the next module.


##  Creating Pathways

In the development of the Pathways project, an internal tool was created by Clearleft to speed up iteration and improve workflow. This tool has now become an integral part of the project, but whilst useful in the development of a Pathway, is in not strictly necessary. It is the layout and setup of the HTML which triggers the corresponding JavaScript to make up a module.

It should be noted that Pathway modules are very much art directed and, thus, bespoke. As such, there are only so many reusable patterns, which are mostly structural. Once the basic structure is in place and the JavaScript is able to do its thing, it’s up to you to hook into the ‘engine’ to accomplish the per-panel effects.

### Structure

#### Intro

The introduction page (index.php within each module) remains very consitent across pathways, and is mainly composed of imagery and links. Creating a new intro page simply involves copying an existing page and switching the background and navigation images, and modifying the link and title text.


#### Module

Within the body tags, the general structure is

    <main role=“main”>

        // Start panel here…
        <div class="start" />

        // Begin the cross fading sequence.
        <div class=“sequence”>

            // 1 or more panels…
            <div class="panel" />
                ...

        </div>

        // Panel Info boxes
        <div class="info-panels">
            // One or more info panel patterns
        </div>

        // Library layer/Teaser ‘fork’ pattern
        <div class="fork"/>

        // Library Layer pattern
        <div class="library-layer"/>

        // Navigation pattern
        <div class="global-navigation"/>

    </main>

#### Panels

A sequence panel is, at its most basic, a `<div>` with a class of 'panel' and contains another div with a class of 'bg-container', like so:

    <div class="panel">
        <div class="bg-container"></div>
    </div>

The `.bg-container` element is the most important, because that is what gets fixed during scroll to provide the cross-fading. It can either be set a background image using CSS, and/or contain multiple images or videos, or any interactive component you care to create. The element only serves to stick to the screen for the 'parallax' effect. What happens inside is pretty much up to you.

When text is involved in a panel, it uses an element with a class of `.main-content`, which sits after the bg-container, like so:

    <div class="panel">
        <div class="bg-container"></div>

        <div class="main-content"></div>
    </div>

It is typically positioned absolutely (when viewed on scroll-enabled devices), on the left and near the bottom of the panel so as to get a nice sweeping scrolling motion over the course of the panel.

Patterns exist for a basic panel and a panel with text for immediate use and editing.






## The Tool

### Creating a new Pathway

In the folder, /pathways there is a folder, `x-example`. Copy this folder and then rename it by incrementing the previous pathways' number and then providing the name of the new pathway, e.g. `3-breath`
