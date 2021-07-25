function draw() {


    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    const args = location.search.slice(1).split('x');
    const mainHeight = args[0] || window.innerHeight || 500;
    const mainWidth = args[1] || window.innerWidth || 1000;

    canvas.width = mainWidth;
    canvas.height = mainHeight;

    ctx.fillStyle = '#FFDCC8';
    ctx.fillRect(0, 0, mainWidth, mainHeight);

    ctx.drawImage(createMountline('#FF6C40', 1), 0, mainHeight * 0.3, mainWidth, mainHeight);
    ctx.drawImage(createMountline('#CB293E', 0.84), 0, mainHeight * 0.4, mainWidth * 1.33, mainHeight * 1.33);
    ctx.drawImage(createMountline('#7F0131', 0.67), 0, mainHeight * 0.53, mainWidth * 1.66, mainHeight * 1.66);
    ctx.drawImage(createMountline('#2D112A', 0.5), 0, mainHeight * 0.64, mainWidth * 2, mainHeight * 2);

    function createTree(color) {
        const treeCanvas = document.createElement('canvas');
        treeCanvas.width = 100;
        treeCanvas.height = 200;

        const ctx = treeCanvas.getContext('2d');
        ctx.fillStyle = color;

        const branch1 = 15;
        const branch2 = 20;
        const branch3 = 25;
        const branchHeight = 25;
        const startX = 50;
        const trunk = 5;

        ctx.beginPath();
        // left side
        ctx.moveTo(startX, 0);
        ctx.lineTo(startX - branch1, branchHeight);
        ctx.lineTo(startX - trunk * 1.25, branchHeight - 10);

        ctx.lineTo(startX - branch2, branchHeight * 2);
        ctx.lineTo(startX - trunk * 2, branchHeight * 2 - 10);

        ctx.lineTo(startX - branch3, branchHeight * 3);
        ctx.lineTo(startX - trunk, branchHeight * 3 - 10);

        //trunk
        ctx.lineTo(startX - trunk, branchHeight * 20);
        ctx.lineTo(startX + trunk, branchHeight * 20);

        // right side
        ctx.lineTo(startX + trunk, branchHeight * 3 - 10);
        ctx.lineTo(startX + branch3, branchHeight * 3);

        ctx.lineTo(startX + trunk * 2, branchHeight * 2 - 10);
        ctx.lineTo(startX + branch2, branchHeight * 2);

        ctx.lineTo(startX + trunk * 1.25, branchHeight - 10);
        ctx.lineTo(startX + branch1, branchHeight);

        ctx.lineTo(startX, 0);


        ctx.fill();

        return treeCanvas;
    }

    function createMountline(color, vScale) {
        const mountCanvas = document.createElement('canvas');
        mountCanvas.width = mainWidth * 2;
        mountCanvas.height = mainHeight * 2;

        const ctx = mountCanvas.getContext('2d');
        ctx.fillStyle = color;

        ctx.moveTo(0, mainWidth * 0.2);
        const pointsMul = 20;
        const pointsNum = (mainWidth * 2) / pointsMul;
        const hScale = 1;
        const halfPi = Math.PI * 0.5;
        const seed = Math.random() - 0.5;
        const offset = seed * halfPi * 3;
        const mod = (1 - seed * 0.5) * mainHeight * 0.06;

        for (let i = 0; i <= pointsNum * pointsMul; i++) {
            const surface1 = Math.sin(offset + 45.0 * halfPi * ((i - 3) / pointsNum)) * 0.015;
            const surface2 = Math.sin(offset + 7.0 * halfPi * ((i - 2) / pointsNum)) * 0.1;
            const surface3 = Math.sin(offset + 20.0 * halfPi * ((i - 13) / pointsNum)) * 0.03;

            const baseline1 = Math.sin(offset * 1.1 + 1.5 * halfPi * ((i - 7) / pointsNum)) * 0.5;
            const baseline2 = Math.sin(offset * 1.2 + 0.3 * halfPi * ((i) / pointsNum)) * 0.8;
            const baseline3 = Math.sin(offset * 1.3 + 0.3 * halfPi * ((i) / pointsNum)) * 0.8;
            const baseline4 = Math.sin(offset * 5.0 + 0.1 * halfPi * ((i) / pointsNum)) * 2.0;

            const x = i * hScale;
            const y = vScale * (mainWidth * 0.4 + (surface1 + surface2 + surface3 + baseline1 + baseline2 + baseline3 + baseline4) * mod);

            ctx.lineTo(x, y);

            const sin1 = Math.sin(41 * halfPi * (i / (pointsNum * 20)));
            const sin2 = Math.sin(63 * halfPi * (i / (pointsNum * 20)));

            if (Math.abs(sin1 - sin2) < 0.35 && i % Math.floor(pointsNum / 2.5) === 0) {
                ctx.drawImage(createTree(color), x, y - mainHeight * 0.04, mainHeight * 0.06, mainHeight * 0.12);
            }
        }

        ctx.lineTo(pointsNum * hScale * pointsMul, mainHeight * 2);
        ctx.lineTo(0, mainHeight * 2);

        ctx.fill();

        return mountCanvas;
    }

}

window.addEventListener('resize', () => {
    draw();
});
draw();
