# SD WebUI Mobile Friendly

<h4 align="right"><i>BETA</i></h4>

This is an extension for the [AUTOMATIC1111 Stable Diffusion WebUI](https://github.com/AUTOMATIC1111/stable-diffusion-webui)  
designed to improve usability when viewing the interface in **portrait** mode.  
It rearranges several UI elements to make navigation smoother on mobile devices.

## Installation

You can install this extension using one of two methods: the standard Web UI interface or manual installation via Git.

### Method 1: Install via Web UI (Recommended)

1. Open your **Stable Diffusion Web UI** in your browser.

2. Navigate to the **Extensions** tab.

3. Click the **Install from URL** sub-tab.

4. In the "URL for extension's git repository" field, paste the following URL:

```
https://github.com/end888160/sd-webui-mobile-friendly
```

5. Click the **Install** button.

6. Go to the **Installed** sub-tab and click **Apply and restart UI**.

**NOTE**: For security reasons, you cannot install an extension from the Web UI if you are running the Web UI in `--listen` mode.

-----

### Method 2: Manual Install via Git

1. Navigate to the `extensions` folder within your Stable Diffusion Web UI directory.

2. Open your terminal or command prompt in the `extensions` folder.

3. Clone the repository using the following command:
  
```bash
git clone https://github.com/end888160/sd-webui-mobile-friendly
```

4. **Restart** your Stable Diffusion Web UI to apply the changes.

## Features

1. Automatically switches between portrait and landscape layouts based on viewport aspect ratio.
2. Moves the generation result panel to the top of the page for quicker access.
3. Adds a **Scroll to Top** button at the bottom of the interface.
4. Slightly enlarges certain buttons  
   - Specifically those using the `tool` class.
5. Increases padding between sliders for easier touch interaction.
6. Centers action buttons inside each `form`.
7. Keeps the **Generate / Interrupt / Skip** button fixed at the bottom of the viewport for quick access.

-----

<sup>**Disclaimer**</sup>  
<sup>This extension does not make the WebUI inherently mobile-friendly.  
It is intended for users accessing the WebUI remotely using the `--listen` launch option.</sup>
