# SD WebUI Mobile Friendly

<h4 align="right"><i>BETA</i></h4>

This is an extension for the [Automatic1111 Stable Diffusion WebUI](https://github.com/AUTOMATIC1111/stable-diffusion-webui)  
that adjusts several UI elements to make the interface **easier to use in portrait mode** on mobile devices.

## Known Incompatibilities

- [sd-webui-prompt-all-in-one](https://github.com/Physton/sd-webui-prompt-all-in-one)  
  - The prompt template panel overlaps with the generation results area when the mobile layout is active.

## Features

1. Automatically switches between portrait and landscape layouts based on viewport aspect ratio.
2. Moves the generation results panel above the parameter settings for quicker access.
3. Adds a “Scroll to Top” button at the bottom of the page for smoother navigation.
4. Slightly enlarges certain buttons  
   - Specifically those using the `tool` class.
5. Increases spacing between sliders for improved touch interaction.
6. Centers buttons inside `form` groups for a cleaner layout.
7. Keeps the Generate / Interrupt / Skip button pinned to the bottom of the viewport.

<hr>

<sup>**Disclaimer**:</sup>  
<sup>This does not make the WebUI fully mobile-friendly on its own.  
It is intended to enhance mobile usability when running the WebUI with the `--listen` argument.</sup>
