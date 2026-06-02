import { useState } from "react";
import "../../../../styles/ServicesFaqSection.css";
import { Plus, Minus } from "lucide-react";

const Faq = ({ content }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    return (
        <section className="faq-section">
            <div className="faq-header">
                <span className="faq-tag">Questions & Answers</span>
                <h2 className="faq-title">Frequently Asked Questions</h2>
                <p className="faq-description">
                    Get answers to the most common questions about our real estate services
                </p>
            </div>

            <div className="faq-container">
                {content.faq.main.map((faq, index) => (
                    <div
                        key={index}
                        className={`faq-item ${activeIndex === index ? 'faq-active' : ''}`}
                    >
                        <button
                            className="faq-question"
                            onClick={() => toggleFAQ(index)}
                            aria-expanded={activeIndex === index}
                            aria-controls={`faq-answer-${index}`}
                        >
                            <span className="question-text">{faq.question}</span>
                            <span className="faq-icon">
                                {activeIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                            </span>
                        </button>
                        <div
                            id={`faq-answer-${index}`}
                            className="faq-answer"
                        >
                            <div className="faq-answer-content">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Faq