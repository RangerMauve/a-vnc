# a-vnc
Render VNC terminals using Aframe entities

## Quick start

- clone the repo
- Install x11vnc
- Run this command to start the server `x11vnc -avahi -noscr -loop -shared -forever -auth guess -reopen -find -nolookup`
- Or run another VNC server / websockify proxy accoding to the [noVNC docs](https://novnc.com/info.html)
- Modify `index.html` to point to your server's IP:port
- Serve `index.html` in a local webserver
- Open in your headset to see the screen.
- Mess around with the display resolution / texture size until you're comfortable

