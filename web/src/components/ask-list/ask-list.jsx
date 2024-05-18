import { faqs } from "../../../../data/faq.data.json";
import AskListItem from "./ask-list-item";

function AskList() {
  return (
    <div className="row container">
        <h1>Frequently Asked Questions</h1>
        <div className="accordion accordion-flush col-12 mt-3" id="accordionFlushExample">
      {faqs.map((item, index) => (
        <AskListItem key={index} item={item} index={index} />
      ))}
    </div>
    </div>
    
  );
}

export default AskList;
