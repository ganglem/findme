export function generateAvatarBase64(username: string, size: number = 128) {
    const pastelColors = [
        "#FF6F91",
        "#957DAD",
        "#76B39D",
        "#FFC75F",
        "#4D9DE0",
        "#FF9671",
        "#8FBC8F"
    ];

    const initials = username.slice(0,2).toUpperCase();

    const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];

    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }
    ctx.fillStyle = randomColor;
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = `${Math.floor(size * 0.5)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(initials, size / 2, size / 2);

    return canvas.toDataURL("image/png");
}