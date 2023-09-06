# Pi Username and Password
User Name: colabdev
Password: colabrocks

# Pi IPs
- Pi 1: 10.146.82.2
- Pi 2: 10.146.82.6

# Configuring Raspberry Pi

### Needed
- Raspberry Pi Station
- Micro HDMI cable
- USB-C cable

### Setup OS
- Download Raspberry imager
- Don't figure any settings, just click 32-bit OS, then insert the micro SD card into a laptop with imager installed. Allow the driver permission, and hit install. Wait around 10 minutes.

### Setup Pi
- Once the OS is installed, insert the micro SD into the pi.
- Go to Raspberry Pi station, plug in USB-C and micro SD; plug in keyboard, mouse, and micro HDMI.
- Follow setup instructions (English, New York)

User Name: colabdev
Password: colabrocks

- Use DukeOpen as WiFi, ignore config warning

### Setup VNC and SSH
- Go into Raspberry Pi Config settings, turn on VNC and SSH. 

In the Raspberry Pi terminal, type: ifconfig. Grab the IP next to inet10.

On your local machine: ssh colabdev@[ipfrominet10]

### VNC on Local Machine
- Open (or download) VNC viewer, type in the IP of the Pi, then you're set!