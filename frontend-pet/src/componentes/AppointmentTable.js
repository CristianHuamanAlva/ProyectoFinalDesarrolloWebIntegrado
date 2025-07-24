import React, { useState, useMemo } from 'react';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Chart as ChartJS, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    BarElement,
    LineElement,
    PointElement, // NECESARIO para líneas
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

function AppointmentTable({ appointments, veterinarios, servicios }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedVet, setSelectedVet] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [mostrarResumen, setMostrarResumen] = useState(false);
    const [mostrarGrafico, setMostrarGrafico] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonths, setSelectedMonths] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedMonthYear, setSelectedMonthYear] = useState(new Date().getFullYear());



    const estados = ['programada', 'completada', 'cancelada'];

    const filteredAppointments = useMemo(() => {
        return appointments.filter(cita => {
            const nombreVet = cita.veterinarian?.user?.name?.toLowerCase() || '';
            const nombreServicio = cita.serv?.serviceName?.toLowerCase() || '';
            const estado = cita.status?.toLowerCase() || '';

            const matchSearch =
                !searchTerm ||
                nombreVet.includes(searchTerm.toLowerCase()) ||
                nombreServicio.includes(searchTerm.toLowerCase()) ||
                estado.includes(searchTerm.toLowerCase());

            const matchVet = !selectedVet || cita.veterinarian?.user?.userId === parseInt(selectedVet);
            const matchService = !selectedService || cita.serv?.serviceId === parseInt(selectedService);
            const matchStatus = !selectedStatus || cita.status === selectedStatus;

            return matchSearch && matchVet && matchService && matchStatus;
        });
    }, [appointments, searchTerm, selectedVet, selectedService, selectedStatus]);

    const calcularResumenIngresos = () => {
        const resumen = {};
        appointments.forEach(cita => {
            const esValida = ['completada', 'programada'].includes(cita.status);
            const vetId = cita.veterinarian?.user?.userId;
            const vetName = cita.veterinarian?.user?.name;

            if (esValida && vetId) {
                if (!resumen[vetId]) {
                    resumen[vetId] = { id: vetId, nombre: vetName, monto: 0 };
                }
                resumen[vetId].monto += cita.cost;
            }
        });
        return Object.values(resumen);
    };

    const generarReporteMensualPDF = async () => {
        const citasDelMes = appointments.filter(cita => {
            const fecha = new Date(cita.date);
            const citaMes = fecha.getMonth() + 1;
            const citaAño = fecha.getFullYear();

            const coincideMes = selectedMonth === 0 || citaMes === selectedMonth;
            const coincideAño = citaAño === selectedMonthYear;

            return coincideAño && coincideMes && ['programada', 'completada'].includes(cita.status);
        });

        if (citasDelMes.length === 0) {
            Swal.fire('Sin datos', 'No hay citas registradas para esa selección.', 'info');
            return;
        }

        const doc = new jsPDF();
        const fecha = new Date().toLocaleString('es-PE');
        const logoUrl = `${process.env.PUBLIC_URL}/img/icono.png`;

        const logoBase64 = await new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                canvas.getContext('2d').drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            };
            img.src = logoUrl;
        });

        const totalMensual = citasDelMes.reduce((sum, c) => sum + c.cost, 0);
        const resumen = {};
        citasDelMes.forEach(cita => {
            const vetId = cita.veterinarian?.user?.userId;
            const vetName = cita.veterinarian?.user?.name;
            if (vetId) {
                if (!resumen[vetId]) {
                    resumen[vetId] = { id: vetId, nombre: vetName, monto: 0 };
                }
                resumen[vetId].monto += cita.cost;
            }
        });

        // Título dinámico
        const nombreMes = selectedMonth === 0
            ? 'Todos los meses'
            : new Date(0, selectedMonth - 1).toLocaleString('es-PE', { month: 'long' });

        const titulo = selectedMonth === 0
            ? `INFORME ANUAL DE GANANCIAS - ${selectedMonthYear}`
            : `INFORME DE GANANCIAS - ${nombreMes.toUpperCase()} ${selectedMonthYear}`;

        // Cabecera
        doc.setFontSize(18);
        doc.text(titulo, 14, 20);
        doc.addImage(logoBase64, 'PNG', 150, 10, 40, 40);

        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text('RUC: 20345678901', 14, 28);
        doc.text('Dirección: Av. Siempre Viva 123 - Lima', 14, 34);
        doc.text('Teléfono: (01) 456-7890', 14, 40);
        doc.text(`Fecha de emisión: ${fecha}`, 14, 46);

        doc.setDrawColor(0, 120, 255);
        doc.setLineWidth(0.5);
        doc.line(14, 50, 195, 50);

        doc.setFontSize(13);
        doc.setTextColor(20, 90, 50);
        doc.text(`Monto Total: S/ ${totalMensual.toFixed(2)}`, 14, 60);

        // Tabla principal
        autoTable(doc, {
            startY: 70,
            head: [['ID Cita', 'Veterinario', 'Servicio', 'Fecha y Hora', 'Estado', 'Costo']],
            body: citasDelMes.map(cita => [
                cita.dateId,
                cita.veterinarian?.user?.name || 'N/A',
                cita.serv?.serviceName || 'N/A',
                new Date(cita.date).toLocaleString('es-PE', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                }),
                cita.status,
                `S/ ${cita.cost.toFixed(2)}`
            ]),
            theme: 'grid',
            headStyles: {
                fillColor: [0, 122, 204],
                textColor: 255,
                fontSize: 11
            },
            bodyStyles: {
                fontSize: 10
            }
        });

        // Resumen por veterinario
        const afterTableY = doc.lastAutoTable.finalY + 10;
        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.text('Resumen de Ingresos por Veterinario', 14, afterTableY);

        doc.setFontSize(11);
        doc.setTextColor(90);
        const descripcion = 'A continuación se presenta la contribución financiera de cada veterinario, basada en citas programadas y completadas.';
        doc.text(doc.splitTextToSize(descripcion, 180), 14, afterTableY + 8);

        autoTable(doc, {
            startY: afterTableY + 20,
            head: [['ID Veterinario', 'Nombre', 'Monto Generado (S/.)']],
            body: Object.values(resumen).map(v => [v.id, v.nombre, v.monto.toFixed(2)]),
            theme: 'striped',
            headStyles: {
                fillColor: [255, 87, 34],
                textColor: 255,
                fontSize: 11
            },
            bodyStyles: {
                fontSize: 10
            }
        });

        // Footer
        const finalY = doc.lastAutoTable.finalY + 10;
        doc.setFontSize(10);
        doc.setTextColor(120);
        doc.text('Gracias por confiar en PetCare. Este informe ha sido generado automáticamente.', 14, finalY);

        const nombreArchivo = selectedMonth === 0
            ? `Reporte_Anual_${selectedMonthYear}.pdf`
            : `Reporte_${nombreMes}_${selectedMonthYear}.pdf`;

        doc.save(nombreArchivo);
    };




    const generarReportePDF = async () => {
        const doc = new jsPDF();
        const fecha = new Date().toLocaleString('es-PE');
        const logoUrl = `${process.env.PUBLIC_URL}/img/icono.png`;

        const toBase64 = (url) =>
            new Promise((resolve) => {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    canvas.getContext('2d').drawImage(img, 0, 0);
                    resolve(canvas.toDataURL('image/png'));
                };
                img.src = url;
            });

        const logoBase64 = await toBase64(logoUrl);

        const citasFiltradas = appointments.filter(c => ['completada', 'programada'].includes(c.status));
        const totalGeneral = citasFiltradas.reduce((sum, c) => sum + c.cost, 0);
        const resumen = calcularResumenIngresos();

        doc.setFontSize(18);
        doc.text('INFORME DE GANANCIAS - PETCARE S.A.C.', 14, 20);
        doc.addImage(logoBase64, 'PNG', 150, 10, 40, 40);

        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text('RUC: 20345678901', 14, 28);
        doc.text('Dirección: Av. Siempre Viva 123 - Lima', 14, 34);
        doc.text('Teléfono: (01) 456-7890', 14, 40);
        doc.text(`Fecha de emisión: ${fecha}`, 14, 46);

        doc.setDrawColor(0, 120, 255);
        doc.setLineWidth(0.5);
        doc.line(14, 50, 195, 50);

        doc.setFontSize(13);
        doc.setTextColor(20, 90, 50);
        doc.text(`Monto Total General: S/ ${totalGeneral.toFixed(2)}`, 14, 60);

        autoTable(doc, {
            startY: 70,
            head: [['ID Cita', 'Veterinario', 'Servicio', 'Fecha y Hora', 'Estado', 'Costo']],
            body: appointments.map(cita => [
                cita.dateId,
                cita.veterinarian?.user?.name || 'N/A',
                cita.serv?.serviceName || 'N/A',
                new Date(cita.date).toLocaleString('es-PE', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                }),
                cita.status,
                `S/ ${cita.cost.toFixed(2)}`
            ]),
            theme: 'grid',
            headStyles: {
                fillColor: [0, 122, 204],
                textColor: 255,
                fontSize: 11
            },
            bodyStyles: {
                fontSize: 10
            }
        });

        const afterTableY = doc.lastAutoTable.finalY + 10;
        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.text('Resumen de Ingresos por Veterinario', 14, afterTableY);

        doc.setFontSize(11);
        doc.setTextColor(90);
        const resumenTexto = 'A continuación se presenta la contribución financiera de cada veterinario, basada en citas programadas y completadas.';
        doc.text(doc.splitTextToSize(resumenTexto, 180), 14, afterTableY + 8);

        autoTable(doc, {
            startY: afterTableY + 20,
            head: [['ID Veterinario', 'Nombre', 'Monto Generado (S/.)']],
            body: resumen.map(v => [v.id, v.nombre, v.monto.toFixed(2)]),
            theme: 'striped',
            headStyles: {
                fillColor: [255, 87, 34],
                textColor: 255,
                fontSize: 11
            },
            bodyStyles: {
                fontSize: 10
            }
        });

        const finalY = doc.lastAutoTable.finalY + 10;
        doc.setFontSize(10);
        doc.setTextColor(120);
        doc.text('Gracias por confiar en PetCare. Este informe ha sido generado automáticamente.', 14, finalY);

        doc.save('Reporte_Ganancias_PetCare.pdf');
    };

    return (
        <>
            <div className="search-wrapper">
                <input
                    type="text"
                    placeholder="🔍 Buscar por veterinario, servicio o estado"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <select value={selectedVet} onChange={(e) => setSelectedVet(e.target.value)} className="role-filter">
                    <option value="">Todos los veterinarios</option>
                    {veterinarios.map(vet => (
                        <option key={vet.userId} value={vet.userId}>{vet.name}</option>
                    ))}
                </select>
                <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className="role-filter">
                    <option value="">Todos los servicios</option>
                    {servicios.map(serv => (
                        <option key={serv.serviceId} value={serv.serviceId}>{serv.serviceName}</option>
                    ))}
                </select>
                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="role-filter">
                    <option value="">Todos los estados</option>
                    {estados.map(est => (
                        <option key={est} value={est}>{est.charAt(0).toUpperCase() + est.slice(1)}</option>
                    ))}
                </select>
            </div>

            <table className="dashboard-table">
                <thead>
                    <tr>
                        <th>ID Cita</th>
                        <th>Veterinario</th>
                        <th>Servicio</th>
                        <th>Fecha y Hora</th>
                        <th>Estado</th>
                        <th>Costo</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAppointments.length === 0 ? (
                        <tr><td colSpan="6"><em>No hay resultados para mostrar.</em></td></tr>
                    ) : (
                        filteredAppointments.map(cita => (
                            <tr key={cita.dateId}>
                                <td>{cita.dateId}</td>
                                <td>{cita.veterinarian?.user?.name || 'N/A'}</td>
                                <td>{cita.serv?.serviceName || 'N/A'}</td>
                                <td>{new Date(cita.date).toLocaleString('es-PE', {
                                    dateStyle: 'short',
                                    timeStyle: 'short'
                                })}</td>
                                <td>{cita.status}</td>
                                <td>S/ {cita.cost.toFixed(2)}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="month-year-selector" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <label>
                    Mes:
                    <select
                        className="form-control custom-select"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    >
                        <option value={0}>Todos los meses</option> {/* 👈 Nuevo */}
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {new Date(0, i).toLocaleString('es-PE', { month: 'long' })}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Año:
                    <select
                        className="form-control custom-select"
                        value={selectedMonthYear}
                        onChange={(e) => setSelectedMonthYear(parseInt(e.target.value))}
                    >
                        {[...new Set(appointments.map(a => new Date(a.date).getFullYear()))]
                            .sort((a, b) => b - a)
                            .map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                    </select>
                </label>
            </div>


            <div className="acciones-citas">
                <button className="action-button" onClick={() => setMostrarResumen(prev => !prev)}>
                    📊 {mostrarResumen ? 'Ocultar resumen de ingresos' : 'Resumen de ingresos'}
                </button>

                <button className="action-button" onClick={() => setMostrarGrafico(prev => !prev)}>
                    📈 {mostrarGrafico ? 'Ocultar gráficas' : 'Ver gráficas'}
                </button>

                <button className="action-button" onClick={generarReporteMensualPDF}>
                    📄 Generar Reporte Mensual
                </button>

                <button className="action-button" onClick={generarReportePDF}>
                    📄 Generar Reporte
                </button>
            </div>

            {mostrarResumen && (
                <table className="dashboard-table resumen-table">
                    <thead>
                        <tr>
                            <th>ID Veterinario</th>
                            <th>Nombre</th>
                            <th>Monto Generado (S/.)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {calcularResumenIngresos().map(vet => (
                            <tr key={vet.id}>
                                <td>{vet.id}</td>
                                <td>{vet.nombre}</td>
                                <td>{vet.monto.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {mostrarGrafico && (
                <div className="grafico-container">
                    <div className="grafico-filtros">
                        <label className="label-select">Año:
                            <select
                                className="select-year"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                            >
                                {[...new Set(appointments.map(a => new Date(a.date).getFullYear()))]
                                    .sort((a, b) => b - a)
                                    .map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                            </select>
                        </label>

                        <fieldset className="meses-checkboxes">
                            <legend>Meses:</legend>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedMonths.length === 12}
                                    onChange={() =>
                                        setSelectedMonths(selectedMonths.length === 12
                                            ? []
                                            : Array.from({ length: 12 }, (_, i) => i + 1))
                                    }
                                />
                                Todos
                            </label>
                            {Array.from({ length: 12 }, (_, i) => (
                                <label key={i}>
                                    <input
                                        type="checkbox"
                                        checked={selectedMonths.includes(i + 1)}
                                        onChange={() => {
                                            setSelectedMonths(prev =>
                                                prev.includes(i + 1)
                                                    ? prev.filter(m => m !== i + 1)
                                                    : [...prev, i + 1]
                                            );
                                        }}
                                    />
                                    {new Date(0, i).toLocaleString('es-PE', { month: 'long' })}
                                </label>
                            ))}
                        </fieldset>
                    </div>

                    <Bar
                        key={selectedYear + '-' + selectedMonths.join(',')}
                        data={{
                            labels: servicios.map(s => s.serviceName),
                            datasets: [
                                {
                                    type: 'bar',
                                    label: 'Ingresos por servicio (S/.)',
                                    data: servicios.map(serv => {
                                        return appointments
                                            .filter(cita => {
                                                const fecha = new Date(cita.date);
                                                return cita.serv?.serviceId === serv.serviceId &&
                                                    fecha.getFullYear() === selectedYear &&
                                                    (selectedMonths.length === 0 || selectedMonths.includes(fecha.getMonth() + 1)) &&
                                                    ['programada', 'completada'].includes(cita.status);
                                            })
                                            .reduce((suma, c) => suma + c.cost, 0);
                                    }),
                                    backgroundColor: servicios.map((_, i) => `hsl(${(i * 30) % 360}, 70%, 60%)`), // Colores variados
                                    borderWidth: 1
                                },
                                {
                                    type: 'bar',
                                    label: 'Cantidad de veces solicitado',
                                    data: servicios.map(serv => {
                                        return appointments
                                            .filter(cita => {
                                                const fecha = new Date(cita.date);
                                                return cita.serv?.serviceId === serv.serviceId &&
                                                    fecha.getFullYear() === selectedYear &&
                                                    (selectedMonths.length === 0 || selectedMonths.includes(fecha.getMonth() + 1)) &&
                                                    ['programada', 'completada'].includes(cita.status);
                                            }).length;
                                    }),
                                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    borderWidth: 1,
                                    yAxisID: 'y1'
                                },
                                {
                                    type: 'line',
                                    label: 'Tendencia de ingresos',
                                    data: servicios.map(serv => {
                                        return appointments
                                            .filter(cita => {
                                                const fecha = new Date(cita.date);
                                                return cita.serv?.serviceId === serv.serviceId &&
                                                    fecha.getFullYear() === selectedYear &&
                                                    (selectedMonths.length === 0 || selectedMonths.includes(fecha.getMonth() + 1)) &&
                                                    ['programada', 'completada'].includes(cita.status);
                                            })
                                            .reduce((suma, c) => suma + c.cost, 0);
                                    }),
                                    borderColor: 'rgba(0, 0, 0, 0.7)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                    tension: 0.4, // suaviza la línea
                                    fill: false,
                                    yAxisID: 'y'
                                }

                            ]
                        }}
                        options={{
                            responsive: true,
                            interaction: {
                                mode: 'index',
                                intersect: false
                            },
                            plugins: {
                                tooltip: {
                                    callbacks: {
                                        label: function (context) {
                                            const label = context.dataset.label || '';
                                            const value = context.raw;
                                            if (label.includes('Ingresos')) {
                                                return `${label}: S/ ${value.toFixed(2)}`;
                                            } else if (label.includes('Cantidad')) {
                                                return `${label}: ${value} veces`;
                                            } else {
                                                return `${label}: S/ ${value.toFixed(2)}`;
                                            }
                                        }
                                    }
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: 'Soles (S/.)'
                                    }
                                },
                                y1: {
                                    beginAtZero: true,
                                    position: 'right',
                                    grid: {
                                        drawOnChartArea: false
                                    },
                                    title: {
                                        display: true,
                                        text: 'Cantidad de veces'
                                    }
                                }
                            }
                        }}
                    />

                </div>
            )}


        </>
    );
}

export default AppointmentTable;
