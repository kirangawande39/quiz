// src/components/StudentResultPDF.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import React from 'react';

const StudentResultPDF = ({ userAnswers, score, totalQuestions }) => {

    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('Quiz Result', 14, 22);

        doc.autoTable({
            startY: 30,
            head: [['Question', 'Your Answer', 'Correct Answer', 'Result']],
            body: userAnswers.map((item, index) => [
                `Q${index + 1}: ${item.question}`,
                item.answer,
                item.correctAnswer,
                item.isCorrect ? 'Correct' : 'Incorrect'
            ]),
        });

        doc.text(`Total Score: ${score} / ${totalQuestions}`, 14, doc.autoTable.previous.finalY + 10);

        doc.save('quiz-result.pdf');
    };

    return (
        <button style={{marginLeft:"800px"}} className="btn btn-success mt-3" onClick={downloadPDF}>
            Download Result
        </button>
    );
};

export default StudentResultPDF;
