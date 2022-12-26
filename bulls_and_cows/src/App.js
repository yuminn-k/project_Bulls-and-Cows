import "./App.css";
import { useState, useEffect } from "react";
import generateRandomNumber from "./random";
import Logs from "./Logs";

function App() {
  // console.log(generateRandomNumber());
  const [randomNumber, setRamdomNumber] = useState(generateRandomNumber());
  const [answer, setAnswer] = useState("");
  const [logs, setLogs] = useState([]);
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    console.log(randomNumber);
  }, [randomNumber]); // 2번째 인자인 randomNumber에 변화가 일어날 때마다 콜백함수 실행, 만일 2번째 인자가 존재하지 않는다면 해당 컴포넌트가 렌더링될 때 처음 1회만 실행된다.

  const handleAnswerChanged = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = () => {
    const answers = answer.split("").map((item) => Number(item)); // 배열로 변환 후 숫자형으로 변환

    // 유효성 검사
    if (answers.some((number) => isNaN(number))) {
      alert("숫자만 입력해주세요");
      return;
    }

    if (answers.length !== 4) {
      alert("4자리 숫자만 입력해주세요");
      return;
    }

    const isDuplicate = answers.some((number) => {
      // 중복 여부
      // [1, 2, 3, 4]
      // -> 앞에서 탐색했을 때 index 0
      // <- 뒤에서부터 탐색했을 때 index 0
      // [1, 1, 2, 4]
      // -> 앞에서 탐색했을 때 index 0
      // <- 뒤에서부터 탐색했을 때 index 1

      return answers.indexOf(number) !== answers.lastIndexOf(number); // 한 개라도 중복이 발생하면 true 리턴
    });

    if (isDuplicate) {
      alert("입력 값에 중복이 있어요");
      return;
    }

    const { strike, ball } = randomNumber.reduce(
      (prev, cur, index) => {
        // 같은 자리에 같은 수가 존재하면 스트라이크
        if (answers[index] === cur) {
          return {
            ...prev,
            strike: prev.strike + 1,
          };
        }
        // 다른 자리에 수가 존재하면 볼
        if (answers.includes(cur)) {
          return {
            ...prev,
            ball: prev.ball + 1,
          };
        }

        return prev;
      },
      {
        strike: 0,
        ball: 0,
      }
    );

    if (strike === 4) {
      alert("정답입니다!");
      setLogs([...logs, `${answer} (축하합니다. 정답입니다)`]);
      setSuccess(true);
      return;
    }

    setLogs([...logs, `${answer} (strike: ${strike}, ball: ${ball})`]);
  };

  const handleRetry = () => {
    setRamdomNumber(generateRandomNumber());
    setAnswer("");
    setLogs([]);
    setSuccess(false);
  };

  return (
    <div className="App">
      <h1>숫자 야구 게임</h1>
      <header className="header">
        {isSuccess ? `정답: ${answer}` : "----"}
      </header>
      <section>
        <input
          type="text"
          value={answer}
          onChange={handleAnswerChanged}
          disabled={isSuccess}
        />
        {isSuccess ? (
          <button onClick={handleRetry}>다시하기</button>
        ) : (
          <button onClick={handleSubmit}>맞춰보기</button>
        )}
      </section>
      <Logs logs={logs} />
    </div>
  );
}

export default App;
