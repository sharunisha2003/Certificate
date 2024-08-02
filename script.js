document.addEventListener("DOMContentLoaded", function() {
    const subjects = [
        { code: "DFS012-101", name: "Fire Science and Technology", maxMarks: 100 },
        { code: "DFS012-102", name: "Fire Prevention and Investigation", maxMarks: 100 },
        { code: "DFS012-103", name: "Fire Protection and Survey", maxMarks: 100 },
        { code: "DFS012-104", name: "Fire Extinction and Control", maxMarks: 100 },
        { code: "DFS012-105", name: "Industrial Safety Management", maxMarks: 100 },
        { code: "DFS012-106", name: "Practical I", maxMarks: 100 },
        { code: "DFS012-107", name: "Practical II", maxMarks: 100 },
        { code: "DFS012-108", name: "Practical III", maxMarks: 100 }
    ];

    const tableBody = document.getElementById("marksTableBody");

    subjects.forEach(subject => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${subject.code}</td>
            <td>${subject.name}</td>
            <td>${subject.maxMarks}</td>
            <td><input type="number" class="marksObtained" max="100" min="0" data-max="${subject.maxMarks}"></td>
            <td class="totalInWords">Zero Zero</td>
        `;
        tableBody.appendChild(row);
    });

    const inputs = document.querySelectorAll(".marksObtained");
    inputs.forEach(input => {
        input.addEventListener("input", calculateResults);
    });

    function calculateResults() {
        let totalMarks = 0;
        let maxTotalMarks = 0;
        inputs.forEach(input => {
            const marks = parseInt(input.value) || 0;
            const maxMarks = parseInt(input.dataset.max);
            totalMarks += marks;
            maxTotalMarks += maxMarks;

            // Update total in words
            const totalInWordsCell = input.parentElement.nextElementSibling;
            totalInWordsCell.textContent = marksToWords(marks);
        });

        const grandTotalElement = document.getElementById("grandTotal");
        const totalInWordsElement = document.getElementById("totalInWords");
        const percentageElement = document.getElementById("percentage");
        const gradeElement = document.getElementById("grade");

        grandTotalElement.textContent = totalMarks;
        totalInWordsElement.textContent = marksToWords(totalMarks);

        const percentage = (totalMarks / maxTotalMarks) * 100;
        percentageElement.textContent = percentage.toFixed(2) + "%";

        let grade = "F";
        if (percentage >= 90) grade = "A+";
        else if (percentage >= 80) grade = "A";
        else if (percentage >= 70) grade = "B+";
        else if (percentage >= 60) grade = "B";
        else if (percentage >= 50) grade = "C";
        else if (percentage >= 40) grade = "D";

        gradeElement.textContent = grade;
    }

    function marksToWords(marks) {
        if (marks === 0) return "Zero Zero";
        const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
        const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
        const teens = ["Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];

        let words = "";
        if (marks >= 100) {
            words += ones[Math.floor(marks / 100)] + " Hundred ";
            marks %= 100;
        }
        if (marks >= 20) {
            words += tens[Math.floor(marks / 10)] + " ";
            marks %= 10;
        } else if (marks >= 11 && marks <= 19) {
            words += teens[marks - 11] + " ";
            marks = 0;
        }
        if (marks > 0) {
            words += ones[marks];
        }

        return words.trim();
    }
});
