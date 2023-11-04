import jsPDF from 'jspdf';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import "../CSS/main.css";

const GenerateConvocation = () => {
  const outletData = useOutletContext()
  const [convocationData, setConvocationData] = useState(null);
  const convocationRef = useRef(null);
  useEffect(() => {
  }, []);

  const generateConvocation = () => {
    // Générer les données de la convocation avec le QR code
    console.log(outletData.loginResponse)
    const simulatedConvocationData = {
      qrCode: outletData.loginResponse.numeroApp,
      numeroapp: outletData.loginResponse.numeroApp,
      nom: outletData.loginResponse.nom,
      prenom: outletData.loginResponse.prenom

    };

    // Afficher les données de la convocation avec le QR code
    setConvocationData(simulatedConvocationData);
  };
  //Téléchargement de la convocation sous format pdf
  const downloadConvocation = () => {
    html2canvas(convocationRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const width = pdf.internal.pageSize.getWidth();
      const height = (imgProps.height * width) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save('convocation.pdf');
    });
  };
  const convoStyle = {
    paddingLeft: "50px",
    marginRight: '30px',
    paddingTop: '100px'
  };

  return (
    <div>
      <button class='btn btn-block col-4 btnStyle' onClick={generateConvocation}>Générer votre convocation</button>
      {convocationData && (
        <div ref={convocationRef} style={convoStyle} >
          <h2 class='text-center'>Convocation</h2>
          <br></br>
          <div class='mr-2'>
            <QRCode value={convocationData.qrCode} />
          </div>
          <hr></hr>
          <br></br>
          <p>Nom : {convocationData.nom}</p>
          <p>prénom : {convocationData.prenom}</p>
          <p>Numéro apogée : {convocationData.numeroapp}</p>
          <hr></hr>
          <div>
            <h2>Tableau des examens</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Matière</th>
                  <th scope="col">Date</th>
                  <th scope="col">Heure de début</th>
                  <th scope="col">Heure de fin</th>
                  <th scope="col">Salle</th>
                  <th scope="col">Table</th>
                </tr>
              </thead>
              <tbody>
                {outletData.loginResponse.examDetails.map((item, index) => (
                  <tr key={index}>
                    <td >{item.matie}</td>
                    <td >{item.dayDate}</td>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                    <td>{item.salles}</td>
                    <td>{item.table}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr></hr>
        </div>
      )}
      {convocationData && (
        <button class='btn btn-block col-4 btnStyle' onClick={downloadConvocation}>Télécharger votre convocation</button>
      )}
      <hr></hr>
    </div>
  );
}
export default GenerateConvocation;