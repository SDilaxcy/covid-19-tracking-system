import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';

const GeneratePDF = (tickets) => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = [
    'Id',
    'Firstname',
    'Lastname',
    'Phone',
    'Age',
    'Vaccine',
    'Apply Date',
  ];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  tickets.forEach((ticket) => {
    const ticketData = [
      ticket._id,
      ticket.firstname,
      ticket.lastname,
      ticket.phone_number,
      ticket.age,
      ticket.vaccine?.name,

      // called date-fns to format the date on the ticket
      format(new Date(ticket.createdAt), 'yyyy-MM-dd'),
    ];
    // push each tickcet's info into a row
    tableRows.push(ticketData);
  });

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(' ');
  // we use a date string to generate our filename.
  const dateStr =
    date[0] + date[1] + date[2] + date[3] + date[4] + date[5] + date[6];
  // ticket title. and margin-top + margin-left
  doc.text('Apply Vaccine Reports', 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default GeneratePDF;
