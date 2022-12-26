const Logs = (props) => {
  return (
    <>
      <h2>기록</h2>
      <ol>
        {props.logs.map((log, index) => {
          return <li key={`${log}_${index}`}>{log}</li>;
        })}
      </ol>
    </>
  );
};

export default Logs;
