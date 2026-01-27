	// 推荐做法：使用 Web Audio API 实现无缝循环
let audioContext = null;
let sourceNode = null;
let audioBuffer = null;

const msg = document.getElementById('msg');

async function loadAndPlay() {
    // 如果已经播放过，就不再重复创建
    if (sourceNode) return;

    // 1. 创建 AudioContext（必须在用户交互后或页面加载后创建）
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (err) {
        msg.textContent = '浏览器不支持 Web Audio API';
        return;
    }

    try {
        // 2. 加载音频文件
        const response = await fetch('/bg.wav');
        const arrayBuffer = await response.arrayBuffer();
        audioBuffer = await audioContext.decodeAudioData(arrayBuffer);


        playLoop();

        if (audioContext.state === 'suspended') {
            const startAudio = () => {
                audioContext.resume().then(() => {
                    playLoop();
                });

                document.removeEventListener('click', startAudio);
                document.removeEventListener('touchstart', startAudio);
            };

            document.addEventListener('click', startAudio, { once: true });
            document.addEventListener('touchstart', startAudio, { once: true });

            msg.textContent = 'a';
        }
    } catch (err) {
        console.error('a', err);
        msg.textContent = 'a';
    }
}

document.addEventListener('DOMContentLoaded', () => {
	const toggleBtn = document.getElementById('toggleBgm');
	let isPlaying = true;  // 默认认为是播放中（因为页面加载会尝试播放）

	if (!toggleBtn) return;

	function updateButtonText() {
		toggleBtn.textContent = `${isPlaying ? 'ON' : 'OFF'}`;
	}

	toggleBtn.addEventListener('click', (e) => {
		e.preventDefault();

		if (!audioContext || !sourceNode) {
			// 还没初始化过音频，就直接尝试启动
			loadAndPlay();
			isPlaying = true;
			updateButtonText();
			return;
		}

		if (isPlaying) {
			// 正在播放 → 暂停
			sourceNode.stop();
			isPlaying = false;
		} else {
			// 已暂停 → 重新播放
			playLoop();
			isPlaying = true;
		}

		updateButtonText();
	});

	// 页面加载完成后更新一次文字（以防 loadAndPlay 成功播放了）
	setTimeout(updateButtonText, 1500);
});

function playLoop() {
    if (!audioBuffer || !audioContext) return;

    // 每次都创建新的 source（Web Audio 中 source 是一次性的）
    sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = audioBuffer;
    sourceNode.loop = true;          // 核心：开启循环
    sourceNode.loopStart = 0.02;  // 跳过开头可能的空白
    sourceNode.loopEnd = audioBuffer.duration - 0.02;

    sourceNode.connect(audioContext.destination);
    sourceNode.start(0);

}

// 页面加载时尝试启动
window.addEventListener('load', loadAndPlay);


	const canvas = document.getElementById('noise-canvas');
	const ctx = canvas.getContext('2d');

	function resize() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	window.addEventListener('resize', resize);
	resize();

	function drawNoise() {
		const w = canvas.width;
		const h = canvas.height;
		const imageData = ctx.createImageData(w, h);
		const data = imageData.data;

		for (let i = 0; i < data.length; i += 4) {
			const v = Math.random() * 255;
			data[i]     = v;     // R
			data[i + 1] = v;     // G
			data[i + 2] = v;     // B
			data[i + 3] = 40 + Math.random() * 80; // A
		}

		ctx.putImageData(imageData, 0, 0);
		requestAnimationFrame(drawNoise);
	}
	requestAnimationFrame(drawNoise);