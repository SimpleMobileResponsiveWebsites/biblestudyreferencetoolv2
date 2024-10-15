import React, { useState } from 'react';
import { Book, FileText } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface FormData {
  book: string;
  chapter: string;
  verse: string;
  firstWitness: string;
  secondWitness: string;
  notes: string;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    book: '',
    chapter: '',
    verse: '',
    firstWitness: '',
    secondWitness: '',
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.book && formData.chapter && formData.verse && formData.firstWitness && formData.secondWitness) {
      generatePDF();
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const lineHeight = 10;
    let yPosition = 20;

    doc.setFontSize(16);
    doc.text('Bible Study Reference', 20, yPosition);
    yPosition += lineHeight * 2;

    doc.setFontSize(12);
    doc.text(`Book: ${formData.book}`, 20, yPosition);
    yPosition += lineHeight;
    doc.text(`Chapter: ${formData.chapter}`, 20, yPosition);
    yPosition += lineHeight;
    doc.text(`Verse: ${formData.verse}`, 20, yPosition);
    yPosition += lineHeight;
    doc.text(`First Witness: ${formData.firstWitness}`, 20, yPosition);
    yPosition += lineHeight;
    doc.text(`Second Witness: ${formData.secondWitness}`, 20, yPosition);
    yPosition += lineHeight * 2;

    doc.setFontSize(14);
    doc.text('Notes:', 20, yPosition);
    yPosition += lineHeight;

    doc.setFontSize(12);
    const splitNotes = doc.splitTextToSize(formData.notes, 170);
    doc.text(splitNotes, 20, yPosition);

    doc.save('bible_study_reference.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <Book className="h-14 w-14 text-blue-500" />
              <h1 className="text-2xl font-semibold">Bible Study Reference Tool</h1>
            </div>
            <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">Book</label>
                  <input
                    type="text"
                    name="book"
                    value={formData.book}
                    onChange={handleInputChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="e.g., Genesis"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Chapter</label>
                  <input
                    type="text"
                    name="chapter"
                    value={formData.chapter}
                    onChange={handleInputChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="e.g., 1"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Verse</label>
                  <input
                    type="text"
                    name="verse"
                    value={formData.verse}
                    onChange={handleInputChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="e.g., 1-3"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">First Witness</label>
                  <input
                    type="text"
                    name="firstWitness"
                    value={formData.firstWitness}
                    onChange={handleInputChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Enter first witness"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Second Witness</label>
                  <input
                    type="text"
                    name="secondWitness"
                    value={formData.secondWitness}
                    onChange={handleInputChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Enter second witness"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Enter your notes here"
                  ></textarea>
                </div>
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <button
                  type="submit"
                  className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                >
                  <FileText className="mr-2" />
                  Generate PDF
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
