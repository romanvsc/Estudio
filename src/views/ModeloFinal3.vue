<template>
  <div class="unit-view">
    <div class="unit-header">
      <span class="unit-badge badge badge-gold">Modelo de Final 3</span>
      <h1>Modelo práctico transcripto y resuelto</h1>
      <p class="unit-subtitle">Transcripción normalizada de la foto con resolución contable de todos los puntos prácticos visibles.</p>
    </div>

    <InfoCard type="important" label="Criterio usado">
      <p>Se resolvió con IVA del 21%, criterio de lo devengado y asientos de diario. En los intereses de compras y ventas se usaron cuentas no devengadas para poder registrar el punto 10.</p>
    </InfoCard>

    <InfoCard type="warning" label="Aclaración de lectura">
      <p>La imagen está inclinada y con partes borrosas, así que la transcripción quedó normalizada. En el punto 7 se tomó <strong>"se venden mercaderías"</strong> porque aparece <strong>CMV 17.500</strong> y el punto siguiente cobra el 30% de esa venta. También quedó explicitado por separado el plazo fijo y el depósito bancario, porque la numeración de ese tramo no se distingue con total nitidez.</p>
    </InfoCard>

    <Accordion title="Enunciado transcripto" :icon="ClipboardList" number="Práctico" color="blue" :defaultOpen="true">
      <ol class="statement-list">
        <li><strong>01/10:</strong> Se constituye la empresa "Zeta". Se realizan los siguientes aportes: efectivo $ 480.000, rodados nuevos $ 438.000, mercaderías $ 535.000 y deudores comerciales $ 85.000.</li>
        <li><strong>02/10:</strong> Se compran mercaderías por $ 120.000 más IVA, en cuenta corriente. Nos cobran $ 2.600 de intereses más IVA.</li>
        <li><strong>01/10:</strong> Se crea un fondo fijo por $ 50.000.</li>
        <li><strong>02/10:</strong> Se constituye un plazo fijo por $ 50.000 a 30 días. Nos genera $ 2.000 de intereses.</li>
        <li><strong>02/10:</strong> Se depositan en el Banco Patagonia $ 40.000, el efectivo sobrante.</li>
        <li><strong>03/10:</strong> Se compran artículos de librería por $ 4.500, IVA incluido, y se paga por fondo fijo.</li>
        <li><strong>03/10:</strong> Se cancela el 12,75% de la deuda con Proveedores en cuenta corriente.</li>
        <li><strong>04/10:</strong> Se venden mercaderías por $ 155.000 más IVA, en cuenta corriente, más intereses por $ 3.500 más IVA. CMV: $ 17.500.</li>
        <li><strong>08/10:</strong> Nos pagan el 30% de la venta anterior con un cheque corriente. Nos cobran el 2% de intereses más IVA.</li>
        <li><strong>12/10:</strong> Se compran mercaderías por $ 45.700 más IVA en cuenta corriente.</li>
        <li><strong>30/10:</strong> Se devengan el 50% de los intereses de compras, el 40% de los intereses de ventas y el 100% del plazo fijo.</li>
      </ol>
    </Accordion>

    <Accordion title="Resolución punto por punto" :icon="Calculator" number="Asientos" color="gold">
      <div class="exercise-block">
        <div class="exercise-head">
          <span class="exercise-number">1</span>
          <div>
            <h3>Constitución de la empresa</h3>
            <p class="exercise-note">Capital aportado = 480.000 + 438.000 + 535.000 + 85.000 = <strong>$ 1.538.000</strong>.</p>
          </div>
          <div class="entry-tags" aria-label="Clasificación contable del asiento">
            <span class="entry-tag is-a" title="Activo">A</span>
            <span class="entry-tag is-pn" title="Patrimonio Neto">PN</span>
          </div>
        </div>
        <div class="journal-entry" role="group" aria-label="Asiento de constitución de la empresa">
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>Caja................................................... 480.000</code></div>
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>Rodados................................................ 438.000</code></div>
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>Mercaderías............................................ 535.000</code></div>
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>Deudores Comerciales.................................... 85.000</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-pn">PN</span><code>a Capital................................................ 1.538.000</code></div>
        </div>
        <p class="impact-line">Impacto: aumenta el Activo y aumenta el Patrimonio Neto por el mismo importe.</p>
      </div>

      <div class="exercise-block">
        <div class="exercise-head">
          <span class="exercise-number">2</span>
          <div>
            <h3>Compra de mercaderías con intereses</h3>
            <p class="exercise-note">IVA CF = (120.000 + 2.600) x 21% = <strong>$ 25.746</strong>.</p>
          </div>
          <div class="entry-tags" aria-label="Clasificación contable del asiento">
            <span class="entry-tag is-a" title="Activo">A</span>
            <span class="entry-tag is-p" title="Pasivo">P</span>
          </div>
        </div>
        <div class="journal-entry" role="group" aria-label="Asiento de compra con intereses">
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>Mercaderías............................................ 120.000</code></div>
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>IVA Crédito Fiscal...................................... 25.746</code></div>
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>Intereses Perdidos No Devengados......................... 2.600</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-p">P</span><code>a Proveedores........................................... 148.346</code></div>
        </div>
        <p class="impact-line">Impacto: sube el Activo por bienes e IVA, y sube el Pasivo por la deuda con el proveedor.</p>
      </div>

      <div class="exercise-block">
        <div class="exercise-head">
          <span class="exercise-number">3</span>
          <div>
            <h3>Creación del fondo fijo</h3>
          </div>
          <div class="entry-tags" aria-label="Clasificación contable del asiento">
            <span class="entry-tag is-a" title="Activo">A</span>
          </div>
        </div>
        <div class="journal-entry" role="group" aria-label="Asiento de creación de fondo fijo">
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>Fondo Fijo.............................................. 50.000</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-a">A</span><code>a Caja................................................... 50.000</code></div>
        </div>
        <p class="impact-line">Impacto: solo cambia la composición del Activo.</p>
      </div>

      <div class="exercise-block">
        <div class="exercise-head">
          <span class="exercise-number">4</span>
          <div>
            <h3>Constitución del plazo fijo</h3>
          </div>
          <div class="entry-tags" aria-label="Clasificación contable del asiento">
            <span class="entry-tag is-a" title="Activo">A</span>
          </div>
        </div>
        <div class="journal-entry" role="group" aria-label="Asiento de constitución de plazo fijo">
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>Plazo Fijo.............................................. 50.000</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-a">A</span><code>a Caja................................................... 50.000</code></div>
        </div>
        <p class="impact-line">Impacto: solo cambia la composición del Activo. Los intereses se reconocen recién al devengarse.</p>
      </div>

      <div class="exercise-block">
        <div class="exercise-head">
          <span class="exercise-number">5</span>
          <div>
            <h3>Depósito en Banco Patagonia</h3>
          </div>
          <div class="entry-tags" aria-label="Clasificación contable del asiento">
            <span class="entry-tag is-a" title="Activo">A</span>
          </div>
        </div>
        <div class="journal-entry" role="group" aria-label="Asiento de depósito bancario">
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>Banco Patagonia c/c..................................... 40.000</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-a">A</span><code>a Caja................................................... 40.000</code></div>
        </div>
        <p class="impact-line">Impacto: solo cambia la composición del Activo.</p>
      </div>

      <div class="exercise-block">
        <div class="exercise-head">
          <span class="exercise-number">6</span>
          <div>
            <h3>Compra de librería con fondo fijo</h3>
            <p class="exercise-note">Base imponible = 4.500 / 1,21 = <strong>$ 3.719,01</strong>. IVA CF = <strong>$ 780,99</strong>.</p>
          </div>
          <div class="entry-tags" aria-label="Clasificación contable del asiento">
            <span class="entry-tag is-a" title="Activo">A</span>
          </div>
        </div>
        <div class="journal-entry" role="group" aria-label="Asiento de compra de librería con fondo fijo">
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>Artículos de Librería.................................... 3.719,01</code></div>
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>IVA Crédito Fiscal......................................... 780,99</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-a">A</span><code>a Fondo Fijo............................................. 4.500,00</code></div>
        </div>
        <p class="impact-line">Impacto: cambia la composición del Activo. Si tu cátedra lo trata como gasto, la primera cuenta puede reemplazarse por Gastos de Librería.</p>
      </div>

      <div class="exercise-block">
        <div class="exercise-head">
          <span class="exercise-number">7</span>
          <div>
            <h3>Cancelación parcial a proveedores</h3>
            <p class="exercise-note">12,75% de 148.346 = <strong>$ 18.913,12</strong>. Se asume pago mediante banco c/c por no indicarse otro medio.</p>
          </div>
          <div class="entry-tags" aria-label="Clasificación contable del asiento">
            <span class="entry-tag is-a" title="Activo">A</span>
            <span class="entry-tag is-p" title="Pasivo">P</span>
          </div>
        </div>
        <div class="journal-entry" role="group" aria-label="Asiento de cancelación parcial a proveedores">
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-p">P</span><code>Proveedores............................................. 18.913,12</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-a">A</span><code>a Banco Patagonia c/c................................... 18.913,12</code></div>
        </div>
        <p class="impact-line">Impacto: baja el Pasivo y baja el Activo por el mismo importe.</p>
      </div>

      <div class="exercise-block">
        <div class="exercise-head">
          <span class="exercise-number">8</span>
          <div>
            <h3>Venta en cuenta corriente con interés</h3>
            <p class="exercise-note">IVA DF = (155.000 + 3.500) x 21% = <strong>$ 33.285</strong>. Total de la venta = <strong>$ 191.785</strong>.</p>
          </div>
          <div class="entry-tags" aria-label="Clasificación contable del asiento">
            <span class="entry-tag is-a" title="Activo">A</span>
            <span class="entry-tag is-p" title="Pasivo">P</span>
            <span class="entry-tag is-rp" title="Resultado Positivo">R+</span>
            <span class="entry-tag is-rn" title="Resultado Negativo">R-</span>
          </div>
        </div>
        <div class="journal-entry" role="group" aria-label="Asiento de venta con interés y costo de ventas">
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>Deudores Comerciales................................... 191.785</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-rp">R+</span><code>a Ventas................................................ 155.000</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-p">P</span><code>a IVA Débito Fiscal...................................... 33.285</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-p">P</span><code>a Intereses Ganados No Devengados......................... 3.500</code></div>
          <div class="entry-line spacer" aria-hidden="true"></div>
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-rn">R-</span><code>Costo de Mercaderías Vendidas............................ 17.500</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-a">A</span><code>a Mercaderías............................................ 17.500</code></div>
        </div>
        <p class="impact-line">Impacto: suben créditos por ventas e intereses, se reconoce el débito fiscal y se baja el stock por el CMV informado.</p>
      </div>

      <div class="exercise-block">
        <div class="exercise-head">
          <span class="exercise-number">9</span>
          <div>
            <h3>Cobro del 30% de la venta anterior</h3>
            <p class="exercise-note">30% de 191.785 = <strong>$ 57.535,50</strong>. Intereses cobrados por el banco: 2% = <strong>$ 1.150,71</strong>. IVA CF sobre ese servicio: <strong>$ 241,65</strong>. Neto acreditado al banco: <strong>$ 56.143,14</strong>.</p>
          </div>
          <div class="entry-tags" aria-label="Clasificación contable del asiento">
            <span class="entry-tag is-a" title="Activo">A</span>
            <span class="entry-tag is-rn" title="Resultado Negativo">R-</span>
          </div>
        </div>
        <div class="journal-entry" role="group" aria-label="Asiento de cobro parcial de venta">
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>Banco Patagonia c/c.................................... 56.143,14</code></div>
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-rn">R-</span><code>Intereses Perdidos...................................... 1.150,71</code></div>
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>IVA Crédito Fiscal........................................ 241,65</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-a">A</span><code>a Deudores Comerciales................................ 57.535,50</code></div>
        </div>
        <p class="impact-line">Impacto: baja parte del crédito por ventas y entra el neto al banco; el costo financiero del cobro se reconoce como resultado negativo.</p>
      </div>

      <div class="exercise-block">
        <div class="exercise-head">
          <span class="exercise-number">10</span>
          <div>
            <h3>Compra de mercaderías en cuenta corriente</h3>
            <p class="exercise-note">IVA CF = 45.700 x 21% = <strong>$ 9.597</strong>.</p>
          </div>
          <div class="entry-tags" aria-label="Clasificación contable del asiento">
            <span class="entry-tag is-a" title="Activo">A</span>
            <span class="entry-tag is-p" title="Pasivo">P</span>
          </div>
        </div>
        <div class="journal-entry" role="group" aria-label="Asiento de compra de mercaderías en cuenta corriente">
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>Mercaderías............................................. 45.700</code></div>
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>IVA Crédito Fiscal....................................... 9.597</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-p">P</span><code>a Proveedores............................................ 55.297</code></div>
        </div>
        <p class="impact-line">Impacto: aumenta el Activo por el stock y el IVA, y aumenta el Pasivo por la deuda comercial.</p>
      </div>

      <div class="exercise-block">
        <div class="exercise-head">
          <span class="exercise-number">11</span>
          <div>
            <h3>Devengamiento al 30/10</h3>
            <p class="exercise-note">Intereses de compras devengados: 50% de 2.600 = <strong>$ 1.300</strong>. Intereses de ventas devengados: 40% de 3.500 = <strong>$ 1.400</strong>. Plazo fijo: <strong>$ 2.000</strong>.</p>
          </div>
          <div class="entry-tags" aria-label="Clasificación contable del asiento">
            <span class="entry-tag is-a" title="Activo">A</span>
            <span class="entry-tag is-p" title="Pasivo">P</span>
            <span class="entry-tag is-rp" title="Resultado Positivo">R+</span>
            <span class="entry-tag is-rn" title="Resultado Negativo">R-</span>
          </div>
        </div>
        <div class="journal-entry" role="group" aria-label="Asiento de devengamiento al cierre">
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-rn">R-</span><code>Intereses Perdidos...................................... 1.300</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-a">A</span><code>a Intereses Perdidos No Devengados...................... 1.300</code></div>
          <div class="entry-line spacer" aria-hidden="true"></div>
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-p">P</span><code>Intereses Ganados No Devengados.......................... 1.400</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-rp">R+</span><code>a Intereses Ganados..................................... 1.400</code></div>
          <div class="entry-line spacer" aria-hidden="true"></div>
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>Intereses a Cobrar....................................... 2.000</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-rp">R+</span><code>a Intereses Ganados..................................... 2.000</code></div>
        </div>
        <p class="impact-line">Impacto: se reconocen resultados por devengado y queda un crédito por cobrar por el rendimiento del plazo fijo.</p>
      </div>
    </Accordion>

    <Accordion title="Resumen de importes clave" :icon="GraduationCap" number="Cálculos" color="teal">
      <div class="summary-grid">
        <div class="summary-card">
          <span class="summary-label">Capital inicial</span>
          <strong>$ 1.538.000</strong>
        </div>
        <div class="summary-card">
          <span class="summary-label">Deuda por compra del 02/10</span>
          <strong>$ 148.346</strong>
        </div>
        <div class="summary-card">
          <span class="summary-label">Pago a proveedores</span>
          <strong>$ 18.913,12</strong>
        </div>
        <div class="summary-card">
          <span class="summary-label">Total de la venta del 04/10</span>
          <strong>$ 191.785</strong>
        </div>
        <div class="summary-card">
          <span class="summary-label">Cobro bruto del 08/10</span>
          <strong>$ 57.535,50</strong>
        </div>
        <div class="summary-card">
          <span class="summary-label">Cobro neto al banco</span>
          <strong>$ 56.143,14</strong>
        </div>
      </div>
    </Accordion>

    <Accordion title="Libro mayor y control Debe = Haber" :icon="BookOpen" number="Mayor" color="purple">
      <div class="ledger-wrap">
        <p class="ledger-note">Mayorización resumida con saldo final por cuenta (deudor o acreedor) luego de registrar todos los asientos del práctico.</p>
        <div class="ledger-table-wrap">
          <table class="ledger-table">
            <thead>
              <tr>
                <th>Cuenta</th>
                <th>Debe</th>
                <th>Haber</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Caja</td><td>$ 480.000,00</td><td>$ 140.000,00</td><td>Deudor $ 340.000,00</td></tr>
              <tr><td>Rodados</td><td>$ 438.000,00</td><td>$ 0,00</td><td>Deudor $ 438.000,00</td></tr>
              <tr><td>Mercaderías</td><td>$ 700.700,00</td><td>$ 17.500,00</td><td>Deudor $ 683.200,00</td></tr>
              <tr><td>Deudores Comerciales</td><td>$ 276.785,00</td><td>$ 57.535,50</td><td>Deudor $ 219.249,50</td></tr>
              <tr><td>Capital</td><td>$ 0,00</td><td>$ 1.538.000,00</td><td>Acreedor $ 1.538.000,00</td></tr>
              <tr><td>IVA Crédito Fiscal</td><td>$ 36.365,64</td><td>$ 0,00</td><td>Deudor $ 36.365,64</td></tr>
              <tr><td>Intereses Perdidos No Devengados</td><td>$ 2.600,00</td><td>$ 1.300,00</td><td>Deudor $ 1.300,00</td></tr>
              <tr><td>Proveedores</td><td>$ 18.913,12</td><td>$ 203.643,00</td><td>Acreedor $ 184.729,88</td></tr>
              <tr><td>Fondo Fijo</td><td>$ 50.000,00</td><td>$ 4.500,00</td><td>Deudor $ 45.500,00</td></tr>
              <tr><td>Plazo Fijo</td><td>$ 50.000,00</td><td>$ 0,00</td><td>Deudor $ 50.000,00</td></tr>
              <tr><td>Banco Patagonia c/c</td><td>$ 96.143,14</td><td>$ 18.913,12</td><td>Deudor $ 77.230,02</td></tr>
              <tr><td>Artículos de Librería</td><td>$ 3.719,01</td><td>$ 0,00</td><td>Deudor $ 3.719,01</td></tr>
              <tr><td>Ventas</td><td>$ 0,00</td><td>$ 155.000,00</td><td>Acreedor $ 155.000,00</td></tr>
              <tr><td>IVA Débito Fiscal</td><td>$ 0,00</td><td>$ 33.285,00</td><td>Acreedor $ 33.285,00</td></tr>
              <tr><td>Intereses Ganados No Devengados</td><td>$ 1.400,00</td><td>$ 3.500,00</td><td>Acreedor $ 2.100,00</td></tr>
              <tr><td>Costo de Mercaderías Vendidas</td><td>$ 17.500,00</td><td>$ 0,00</td><td>Deudor $ 17.500,00</td></tr>
              <tr><td>Intereses Perdidos</td><td>$ 2.450,71</td><td>$ 0,00</td><td>Deudor $ 2.450,71</td></tr>
              <tr><td>Intereses Ganados</td><td>$ 0,00</td><td>$ 3.400,00</td><td>Acreedor $ 3.400,00</td></tr>
              <tr><td>Intereses a Cobrar</td><td>$ 2.000,00</td><td>$ 0,00</td><td>Deudor $ 2.000,00</td></tr>
            </tbody>
          </table>
        </div>

        <div class="check-grid">
          <div class="check-card">
            <span>Sumatoria movimientos Debe</span>
            <strong>$ 2.176.576,62</strong>
          </div>
          <div class="check-card">
            <span>Sumatoria movimientos Haber</span>
            <strong>$ 2.176.576,62</strong>
          </div>
          <div class="check-card ok">
            <span>Comprobación</span>
            <strong>Debe = Haber</strong>
          </div>
        </div>

        <div class="equation-proof">
          <h4>Igualdad contable ampliada</h4>
          <p><strong>ACTIVO + R- = PN + PASIVO + R+</strong></p>
          <p>
            <strong>$ 1.896.564,17</strong> + <strong>$ 19.950,71</strong>
            =
            <strong>$ 1.538.000,00</strong> + <strong>$ 220.114,88</strong> + <strong>$ 158.400,00</strong>
          </p>
          <p><strong>$ 1.916.514,88 = $ 1.916.514,88</strong></p>
        </div>

        <div class="category-major">
          <h4>Libro mayor por registro contable</h4>
          <div class="category-major-wrap">
            <table class="category-major-table">
              <thead>
                <tr>
                  <th>Registro</th>
                  <th>Mayores incluidos</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span class="entry-tag is-a">A</span> Activo</td>
                  <td>Caja, Rodados, Mercaderías, Deudores Comerciales, IVA CF, Intereses Perdidos No Devengados, Fondo Fijo, Plazo Fijo, Banco Patagonia c/c, Artículos de Librería, Intereses a Cobrar</td>
                  <td><strong>$ 1.896.564,17</strong></td>
                </tr>
                <tr>
                  <td><span class="entry-tag is-rn">R-</span> Resultado Negativo</td>
                  <td>Costo de Mercaderías Vendidas, Intereses Perdidos</td>
                  <td><strong>$ 19.950,71</strong></td>
                </tr>
                <tr>
                  <td><span class="entry-tag is-pn">PN</span> Patrimonio Neto</td>
                  <td>Capital</td>
                  <td><strong>$ 1.538.000,00</strong></td>
                </tr>
                <tr>
                  <td><span class="entry-tag is-p">P</span> Pasivo</td>
                  <td>Proveedores, IVA Débito Fiscal, Intereses Ganados No Devengados</td>
                  <td><strong>$ 220.114,88</strong></td>
                </tr>
                <tr>
                  <td><span class="entry-tag is-rp">R+</span> Resultado Positivo</td>
                  <td>Ventas, Intereses Ganados</td>
                  <td><strong>$ 158.400,00</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p class="ledger-note">También queda validada la igualdad por saldos: total saldos deudores = $ 1.916.514,88 y total saldos acreedores = $ 1.916.514,88.</p>
      </div>
    </Accordion>
  </div>
</template>

<script setup>
import Accordion from '../components/Accordion.vue'
import InfoCard from '../components/InfoCard.vue'
import { ClipboardList, Calculator, GraduationCap, BookOpen } from 'lucide-vue-next'

defineProps({
  searchQuery: { type: String, default: '' }
})
</script>

<style scoped>
.unit-view {
  animation: fadeInUp 0.4s ease-out;
}

.unit-header {
  margin-bottom: 32px;
}

.unit-badge {
  margin-bottom: 12px;
}

.badge-gold {
  background: var(--accent-gold-soft);
  color: var(--accent-gold);
  border: 1px solid var(--accent-gold);
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.unit-header h1 {
  margin-bottom: 8px;
}

.unit-subtitle {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.statement-list {
  padding-left: 20px;
  display: grid;
  gap: 10px;
}

.statement-list li {
  color: var(--text-secondary);
}

.exercise-block {
  padding: 0 0 18px;
  margin-bottom: 18px;
  border-bottom: 1px solid var(--border-color);
}

.exercise-block:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.exercise-head {
  display: grid;
  grid-template-columns: 30px 1fr;
  column-gap: 14px;
  align-items: flex-start;
  margin-bottom: 12px;
}

.entry-tags {
  grid-column: 2;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 6px;
}

.entry-tag {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 700;
  border: 1px solid transparent;
}

.entry-tag.is-a {
  color: var(--accent-blue);
  background: var(--accent-blue-soft);
  border-color: var(--accent-blue);
}

.entry-tag.is-p {
  color: var(--accent-amber);
  background: color-mix(in srgb, var(--accent-amber) 18%, transparent);
  border-color: var(--accent-amber);
}

.entry-tag.is-pn {
  color: var(--accent-purple);
  background: color-mix(in srgb, var(--accent-purple) 18%, transparent);
  border-color: var(--accent-purple);
}

.entry-tag.is-rp {
  color: var(--accent-teal);
  background: var(--accent-teal-soft);
  border-color: var(--accent-teal);
}

.entry-tag.is-rn {
  color: var(--accent-red);
  background: var(--accent-red-soft);
  border-color: var(--accent-red);
}

.exercise-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--accent-gold);
  background: var(--accent-gold-soft);
  border: 1px solid var(--accent-gold);
}

.exercise-head h3 {
  margin-bottom: 4px;
}

.exercise-note {
  margin: 0;
  color: var(--text-muted);
}

.journal-entry {
  margin: 0 0 10px;
  padding: 14px 16px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background: var(--bg-tertiary);
  color: var(--text-primary);
  display: grid;
  gap: 6px;
}

.entry-line {
  display: grid;
  grid-template-columns: 24px 28px 1fr;
  gap: 8px;
  align-items: center;
}

.entry-line code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.55;
  white-space: pre;
}

.entry-line.spacer {
  min-height: 6px;
}

.line-chip {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.66rem;
  font-weight: 700;
  border: 1px solid transparent;
}

.line-chip.debe {
  color: var(--accent-blue);
  background: var(--accent-blue-soft);
  border-color: var(--accent-blue);
}

.line-chip.haber {
  color: var(--accent-amber);
  background: color-mix(in srgb, var(--accent-amber) 18%, transparent);
  border-color: var(--accent-amber);
}

.line-chip.type {
  width: 26px;
  height: 26px;
}

.impact-line {
  margin: 0;
  color: var(--text-secondary);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 14px;
}

.summary-card {
  padding: 16px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background: var(--bg-card);
}

.summary-label {
  display: block;
  margin-bottom: 8px;
  color: var(--text-muted);
  font-size: 0.82rem;
}

.ledger-wrap {
  display: grid;
  gap: 12px;
}

.ledger-note {
  margin: 0;
  color: var(--text-secondary);
}

.ledger-table-wrap {
  overflow-x: auto;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}

.ledger-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 720px;
}

.ledger-table th,
.ledger-table td {
  text-align: left;
  padding: 10px 12px;
  border-bottom: 1px solid var(--border-color);
  font-size: 0.88rem;
}

.ledger-table thead th {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  font-weight: 700;
}

.ledger-table tbody tr:last-child td {
  border-bottom: none;
}

.check-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 10px;
}

.check-card {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 12px;
  background: var(--bg-card);
}

.check-card span {
  display: block;
  color: var(--text-muted);
  font-size: 0.8rem;
  margin-bottom: 6px;
}

.check-card.ok {
  border-color: var(--accent-teal);
  background: var(--accent-teal-soft);
}

.equation-proof {
  position: relative;
  border: 2px solid var(--accent-teal);
  border-radius: var(--radius-md);
  padding: 16px 14px 12px;
  background:
    linear-gradient(140deg, color-mix(in srgb, var(--accent-teal) 14%, transparent), transparent 62%),
    var(--bg-card);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.equation-proof::before {
  content: 'Comprobacion';
  position: absolute;
  top: 0;
  right: 10px;
  transform: translateY(-50%);
  border: 1px solid var(--border-color);
  border-radius: 999px;
  background: var(--accent-teal);
  color: #063327;
  padding: 2px 10px;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.equation-proof::after {
  content: '';
  position: absolute;
  width: 100px;
  height: 100px;
  right: -30px;
  bottom: -52px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--accent-teal) 14%, transparent);
  pointer-events: none;
}

.equation-proof h4 {
  margin: 0 0 10px;
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.equation-proof p {
  margin: 0;
  color: var(--text-primary);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.45;
  background: color-mix(in srgb, var(--bg-secondary) 82%, transparent);
  border: 1px dashed color-mix(in srgb, var(--accent-teal) 50%, var(--border-color));
  border-radius: 8px;
  padding: 7px 10px;
}

.equation-proof p + p {
  margin-top: 8px;
}

.category-major {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 12px;
  background: var(--bg-card);
}

.category-major h4 {
  margin: 0 0 10px;
}

.category-major-wrap {
  overflow-x: auto;
}

.category-major-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 760px;
}

.category-major-table th,
.category-major-table td {
  text-align: left;
  vertical-align: top;
  padding: 10px 12px;
  border-bottom: 1px solid var(--border-color);
  font-size: 0.86rem;
}

.category-major-table thead th {
  background: var(--bg-tertiary);
  font-weight: 700;
}

.category-major-table tbody tr:last-child td {
  border-bottom: none;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .entry-line code {
    font-size: 0.8rem;
  }

  .equation-proof {
    padding: 14px 10px 10px;
  }

  .equation-proof::before {
    right: 8px;
    font-size: 0.55rem;
  }

  .equation-proof p {
    font-size: 0.82rem;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>