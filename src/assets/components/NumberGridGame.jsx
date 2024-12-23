import { useEffect, useState } from 'react';
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5,90px)',
  gridTemplateRows: 'repeat(5,90px)',
  justifyContent: 'center',
  alignItems: 'center',
};
const cellStyle = {
  width: '90px',
  height: '90px',
  fontSize: '29px',
  fontWeight: 'bold',
  background: 'rgb(147, 212, 209)',
  border: 'white solid 5px',
};
const btnStyle = {
  marginTop: '20px',
  fontSize: '1.5rem',
};
const textStyle = {
  textAlign: 'center',
};

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
export const NumberGridGame = () => {
  const array1 = Array.from({ length: 25 }, (_, n) => 50 - n);
  const array2 = Array.from({ length: 25 }, (_, n) => 25 - n);
  const [numbers, setNumbers] = useState(shuffleArray(array1));
  const [extraNumbers, setExtraNumbers] = useState(shuffleArray(array2));
  console.log(extraNumbers);
  const [currentNum, setCurrentNum] = useState(1); //クリックするべき現在の番号
  const [startTime, setStartTime] = useState(null); //ゲーム開始時刻
  const [elapsedTime, setElapsedTime] = useState(null); //経過時間
  const [result, setResult] = useState('');
  const [disableButtons, setDisableButtons] = useState([false]);
  //数字をランダムにシャッフルしてセット
  useEffect(() => {
    setStartTime(null);
    setElapsedTime(null);
    setCurrentNum(50);
  }, []);
  //数字をクリックしたときの処理
  const handleClick = (number, index) => {
    if (number === currentNum) {
      //正しい順番なら消す
      const updateNumbers = [...numbers];
      const newDisabledButtons = [...disableButtons];
      if (extraNumbers.length > 0) {
        updateNumbers[index] = extraNumbers[0];
        setExtraNumbers(extraNumbers.slice(1));
      } else {
        updateNumbers[index] = null;
        newDisabledButtons[index] = true;
      }

      setNumbers(updateNumbers);
      //次の番号へ
      setCurrentNum(currentNum - 1);
      //ゲーム開始時刻を記録
      setDisableButtons(newDisabledButtons);
      if (currentNum === 50) {
        setStartTime(Date.now());
      }
      //ゲーム終了時刻を計算
      if (currentNum === 1) {
        const stopTime1 = ((Date.now() - startTime) / 1000).toFixed(2);
        const stopTime2 = ((Date.now() - startTime) / 1000).toFixed(0);
        const time = stopTime2;
        setElapsedTime(stopTime1);
        if (time <= 19) {
          setResult('S');
        } else if (time >= 20 && time <= 29) {
          setResult('A');
        } else if (time >= 30 && time <= 39) {
          setResult('B');
        } else if (time >= 40 && time <= 59) {
          setResult('C');
        } else if (time >= 60 && time <= 79) {
          setResult('D');
        } else if (time >= 80 && time <= 99) {
          setResult('E');
        } else {
          setResult('F');
        }
      }
    }
  };
  //リセットボタンを押したときの処理
  const resetGame = () => {
    const shuffleNewArray = shuffleArray(array1);
    const shuffleNewExreaArray = shuffleArray(array2);
    setNumbers(shuffleNewArray);
    setExtraNumbers(shuffleNewExreaArray);
    setCurrentNum(50);
    setStartTime(null);
    setElapsedTime(null);
    setResult(null);
    setDisableButtons([false]);
  };
  return (
    <>
      <h1 style={textStyle}>Number Grid Game</h1>
      {result && <h2 style={textStyle}>Rank:{result}</h2>}
      {elapsedTime && (
        <p style={textStyle}>ゲーム終了！経過時間:{elapsedTime}秒</p>
      )}
      <div style={gridStyle}>
        {numbers.map((num, index) => (
          <button
            disabled={disableButtons[index]}
            key={index}
            style={cellStyle}
            onClick={() => handleClick(num, index)}
          >
            {num}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button style={btnStyle} onClick={resetGame}>
          リセット
        </button>
      </div>
    </>
  );
};
