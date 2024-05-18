function AskListItem({ item, index }) {
    const { question, answer } = item;
    const targetId = `flush-collapse${index}`;
    const buttonId = `flush-heading${index}`;
  
    return (
      <div className="accordion-item  ">
        <h2 className="accordion-header " id={buttonId}>
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${targetId}`}
            aria-expanded="false"
            aria-controls={targetId}
            style={{backgroundColor: "black", color: "white"}}
          >
            {question}
          </button>
        </h2>
        <div
          id={targetId}
          className="accordion-collapse collapse"
          aria-labelledby={buttonId}
          data-bs-parent="#accordionFlushExample"
          style={{backgroundColor: "rgb(34, 34, 34)", color: "white"}}
        >
          <div className="accordion-body">{answer}</div>
        </div>
      </div>
    );
  }
  
  export default AskListItem;
  