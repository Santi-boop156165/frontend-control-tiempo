import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
});

// Componente para generar el PDF
const MyDoc = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Información del Cliente</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Nombre</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Fecha</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Minutos</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}># Consentimiento</Text>
            </View>

            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Manilla</Text>
            </View>
          </View>

          {data.map((cliente, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{cliente.first_name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {cliente.control_tiempo_date}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {cliente.control_tiempo_minutes_spent}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {cliente.control_tiempo_consentNumber}
                </Text>
              </View>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {cliente.control_tiempo_handleColor}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

const ButtonDowloadPdf = ({ data }) => {
  const currentDateISO = new Date(new Date().setHours(0, 0, 0, 0))
    .toISOString()
    .split("T")[0];

  const flattenControlTiempo = (clientes) => {
    const flattenedData = [];

    clientes.forEach((cliente) => {
      const lastControl = cliente.control_tiempo.slice().sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      })[0];

      if (lastControl && lastControl.date === currentDateISO) {
        flattenedData.push({
          id: cliente.id,
          first_name: cliente.first_name,
          second_name: cliente.second_name,
          first_surname: cliente.first_surname,
          second_surname: cliente.second_surname,
          age: cliente.age,
          identification: cliente.identification,
          phone: cliente.phone,
          email: cliente.email,
          control_tiempo_date: lastControl.date,
          control_tiempo_minutes_spent: lastControl.minutes_spent,
          control_tiempo_consentNumber: lastControl.consentNumber,
          control_tiempo_handleColor: lastControl.handleColor,
        });
      }
    });

    return flattenedData;
  };

  const flattenedData = flattenControlTiempo(data);

  return (
    <div>
      <PDFDownloadLink
        document={<MyDoc data={flattenedData} />}
        fileName="clientes.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Cargando documento..." : "Descargar PDF"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default ButtonDowloadPdf;
