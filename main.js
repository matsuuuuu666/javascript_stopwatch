"use strict"; //strictモード

{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  let startTime;
  let timeoutid;
  let elapsedTime = 0; //経過時間

  function countUp() {
    const d = new Date(Date.now() - startTime + elapsedTime);
    const h = String(d.getUTCHours()).padStart(1,'0'); //padStart(len,pad) :lenの長さになるまでpadを追加
    const m = String(d.getMinutes()).padStart(1, '0');
    const s = String(d.getSeconds()).padStart(1, '0');
    const ms = String(d.getMilliseconds()).padStart(1, '0').slice(0,1); //slice(2,4):2文字目と3文字目を切り抜く
    
    timer.textContent = `${h}:${m}:${s}:${ms}`;

    timeoutid = setTimeout(() => {
    
      countUp();
    }, 10);
  }

  function setButtonStateInitial() {
    start.classList.remove('inactive'); // 活性
    stop.classList.add('inactive');// 非活性
    reset.classList.add('inactive');// 非活性
  }
  
  function setButtonStateRunning() {
    start.classList.add('inactive');// 非活性
    stop.classList.remove('inactive');  // 活性
    reset.classList.add('inactive');// 非活性
  }

  function setButtonStateStopped() {
    start.classList.remove('inactive'); // 活性
    stop.classList.add('inactive');// 非活性
    reset.classList.remove('inactive'); // 活性
  }

  setButtonStateInitial();

  start.addEventListener('click', () => {
    if (start.classList.contains('inactive')) {
      return;
    }
    // ボタンをタイマー'動作中'状態とする
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  });

  // Stopボタンクリック
  // …タイマーを停止します
  stop.addEventListener('click', () => {
    if (stop.classList.contains('inactive')) {
      return;
    }
    // タイマーを'停止中'状態とする
    setButtonStateStopped();
    clearTimeout(timeoutid);
    elapsedTime += Date.now() - startTime;
  });

  // Resetボタンクリック
  // …タイマーを「0:0:0:0」で上書き
  reset.addEventListener('click', () => {
    if (reset.classList.contains('inactive') ) {
      return;
    }
    // ボタンを'初期'状態とする
    setButtonStateInitial();
    timer.textContent = '0:0:0:0';
    elapsedTime = 0;
  });
}