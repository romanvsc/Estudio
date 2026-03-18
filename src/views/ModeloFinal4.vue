<template>
  <div class="unit-view">
    <div class="unit-header">
      <span class="unit-badge badge badge-gold">Modelo de Final 4</span>
      <h1>Modelo práctico propuesto y resuelto</h1>
      <p class="unit-subtitle">Otro práctico integral armado con la misma metodología: enunciado, desarrollo de cálculos, asiento y explicación contable.</p>
    </div>

    <InfoCard type="important" label="Metodología">
      <p>Se aplicó IVA del 21%, base devengado, cuentas patrimoniales y de resultado, más cuentas de intereses no devengados cuando corresponde para registrar el devengamiento al cierre.</p>
    </InfoCard>

    <InfoCard type="info" label="Cómo leerlo">
      <p>Primero tenés el enunciado completo. Después, cada punto se resuelve con el cálculo principal, el asiento y una línea corta con el efecto patrimonial para fijar la lógica.</p>
    </InfoCard>

    <Accordion title="Enunciado propuesto" :icon="ClipboardList" number="1 a 10" color="blue" :defaultOpen="true">
      <ol class="statement-list">
        <li><strong>01/11:</strong> Se constituye la empresa “Nexo”. Los socios aportan: efectivo $ 620.000, mercaderías $ 480.000, rodados $ 350.000 y deudores comerciales $ 90.000.</li>
        <li><strong>02/11:</strong> Se compran mercaderías por $ 98.000 más IVA en cuenta corriente. El proveedor cobra intereses por financiación por $ 2.940 más IVA.</li>
        <li><strong>02/11:</strong> Se crea un fondo fijo por $ 40.000.</li>
        <li><strong>03/11:</strong> Se depositan en Banco Patagonia c/c $ 150.000.</li>
        <li><strong>04/11:</strong> Se constituye un plazo fijo por $ 80.000 a 30 días. Generará $ 4.800 de intereses.</li>
        <li><strong>05/11:</strong> Se compran artículos de limpieza por $ 6.050, IVA incluido, abonando con fondo fijo.</li>
        <li><strong>06/11:</strong> Se cancela el 25% de la deuda con Proveedores mediante banco c/c.</li>
        <li><strong>10/11:</strong> Se venden mercaderías por $ 210.000 más IVA en cuenta corriente, más intereses por financiación de $ 6.000 más IVA. CMV: $ 72.000.</li>
        <li><strong>12/11:</strong> El cliente cancela el 40% de la venta anterior con cheque corriente. El banco cobra gastos financieros del 1,5% más IVA.</li>
        <li><strong>30/11:</strong> Se devengan el 60% de los intereses de compras, el 50% de los intereses de ventas y el 100% de los intereses del plazo fijo.</li>
      </ol>
    </Accordion>

    <Accordion title="Resolución punto por punto" :icon="Calculator" number="Asientos" color="gold">
      <div class="exercise-block">
        <div class="exercise-head">
          <span class="exercise-number">1</span>
          <div>
            <h3>Constitución de la empresa</h3>
            <p class="exercise-note">Capital aportado = 620.000 + 480.000 + 350.000 + 90.000 = <strong>$ 1.540.000</strong>.</p>
          </div>
          <div class="entry-tags" aria-label="Clasificación contable del asiento">
            <span class="entry-tag is-a" title="Activo">A</span>
            <span class="entry-tag is-pn" title="Patrimonio Neto">PN</span>
          </div>
        </div>
        <div class="journal-entry" role="group" aria-label="Asiento de constitución de la empresa">
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>Caja................................................... 620.000</code></div>
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>Mercaderías............................................ 480.000</code></div>
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>Rodados................................................ 350.000</code></div>
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>Deudores Comerciales.................................... 90.000</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-pn">PN</span><code>a Capital................................................ 1.540.000</code></div>
        </div>
        <p class="impact-line">Impacto: aumenta el Activo y aumenta el Patrimonio Neto por el valor total del aporte.</p>
      </div>

      <div class="exercise-block">
        <div class="exercise-head">
          <span class="exercise-number">2</span>
          <div>
            <h3>Compra de mercaderías financiada</h3>
            <p class="exercise-note">IVA CF = (98.000 + 2.940) x 21% = <strong>$ 21.197,40</strong>. Total adeudado = <strong>$ 122.137,40</strong>.</p>
          </div>
          <div class="entry-tags" aria-label="Clasificación contable del asiento">
            <span class="entry-tag is-a" title="Activo">A</span>
            <span class="entry-tag is-p" title="Pasivo">P</span>
          </div>
        </div>
        <div class="journal-entry" role="group" aria-label="Asiento de compra de mercaderías financiada">
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>Mercaderías............................................. 98.000,00</code></div>
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>IVA Crédito Fiscal...................................... 21.197,40</code></div>
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>Intereses Perdidos No Devengados......................... 2.940,00</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-p">P</span><code>a Proveedores.......................................... 122.137,40</code></div>
        </div>
        <p class="impact-line">Impacto: aumenta el Activo por la compra y el crédito fiscal; aumenta el Pasivo por la deuda comercial total.</p>
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
        <div class="journal-entry" role="group" aria-label="Asiento de creación del fondo fijo">
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>Fondo Fijo.............................................. 40.000</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-a">A</span><code>a Caja................................................... 40.000</code></div>
        </div>
        <p class="impact-line">Impacto: variación permutativa de Activo.</p>
      </div>

      <div class="exercise-block">
        <div class="exercise-head">
          <span class="exercise-number">4</span>
          <div>
            <h3>Depósito bancario</h3>
          </div>
          <div class="entry-tags" aria-label="Clasificación contable del asiento">
            <span class="entry-tag is-a" title="Activo">A</span>
          </div>
        </div>
        <div class="journal-entry" role="group" aria-label="Asiento de depósito bancario">
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>Banco Patagonia c/c.................................... 150.000</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-a">A</span><code>a Caja.................................................. 150.000</code></div>
        </div>
        <p class="impact-line">Impacto: cambia la composición del Activo sin modificar el total.</p>
      </div>

      <div class="exercise-block">
        <div class="exercise-head">
          <span class="exercise-number">5</span>
          <div>
            <h3>Constitución del plazo fijo</h3>
          </div>
          <div class="entry-tags" aria-label="Clasificación contable del asiento">
            <span class="entry-tag is-a" title="Activo">A</span>
          </div>
        </div>
        <div class="journal-entry" role="group" aria-label="Asiento de constitución de plazo fijo">
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>Plazo Fijo.............................................. 80.000</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-a">A</span><code>a Banco Patagonia c/c................................... 80.000</code></div>
        </div>
        <p class="impact-line">Impacto: se reclasifica un activo disponible a una inversión transitoria.</p>
      </div>

      <div class="exercise-block">
        <div class="exercise-head">
          <span class="exercise-number">6</span>
          <div>
            <h3>Compra de artículos de limpieza</h3>
            <p class="exercise-note">Base imponible = 6.050 / 1,21 = <strong>$ 5.000</strong>. IVA CF = <strong>$ 1.050</strong>.</p>
          </div>
          <div class="entry-tags" aria-label="Clasificación contable del asiento">
            <span class="entry-tag is-a" title="Activo">A</span>
            <span class="entry-tag is-rn" title="Resultado Negativo">R-</span>
          </div>
        </div>
        <div class="journal-entry" role="group" aria-label="Asiento de compra de artículos de limpieza">
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-rn">R-</span><code>Gastos de Limpieza....................................... 5.000</code></div>
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>IVA Crédito Fiscal....................................... 1.050</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-a">A</span><code>a Fondo Fijo............................................. 6.050</code></div>
        </div>
        <p class="impact-line">Impacto: se reconoce un resultado negativo y baja el Activo por el uso del fondo fijo.</p>
      </div>

      <div class="exercise-block">
        <div class="exercise-head">
          <span class="exercise-number">7</span>
          <div>
            <h3>Cancelación parcial a proveedores</h3>
            <p class="exercise-note">25% de 122.137,40 = <strong>$ 30.534,35</strong>.</p>
          </div>
          <div class="entry-tags" aria-label="Clasificación contable del asiento">
            <span class="entry-tag is-a" title="Activo">A</span>
            <span class="entry-tag is-p" title="Pasivo">P</span>
          </div>
        </div>
        <div class="journal-entry" role="group" aria-label="Asiento de cancelación parcial a proveedores">
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-p">P</span><code>Proveedores............................................. 30.534,35</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-a">A</span><code>a Banco Patagonia c/c................................... 30.534,35</code></div>
        </div>
        <p class="impact-line">Impacto: disminuye el Pasivo y disminuye el Activo por el pago parcial.</p>
      </div>

      <div class="exercise-block">
        <div class="exercise-head">
          <span class="exercise-number">8</span>
          <div>
            <h3>Venta en cuenta corriente con interés</h3>
            <p class="exercise-note">IVA DF = (210.000 + 6.000) x 21% = <strong>$ 45.360</strong>. Crédito total al cliente = <strong>$ 261.360</strong>.</p>
          </div>
          <div class="entry-tags" aria-label="Clasificación contable del asiento">
            <span class="entry-tag is-a" title="Activo">A</span>
            <span class="entry-tag is-p" title="Pasivo">P</span>
            <span class="entry-tag is-rp" title="Resultado Positivo">R+</span>
            <span class="entry-tag is-rn" title="Resultado Negativo">R-</span>
          </div>
        </div>
        <div class="journal-entry" role="group" aria-label="Asiento de venta con interés y costo de ventas">
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>Deudores Comerciales................................... 261.360</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-rp">R+</span><code>a Ventas................................................ 210.000</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-p">P</span><code>a IVA Débito Fiscal...................................... 45.360</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-p">P</span><code>a Intereses Ganados No Devengados......................... 6.000</code></div>
          <div class="entry-line spacer" aria-hidden="true"></div>
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-rn">R-</span><code>Costo de Mercaderías Vendidas............................ 72.000</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-a">A</span><code>a Mercaderías............................................ 72.000</code></div>
        </div>
        <p class="impact-line">Impacto: se reconoce el crédito por venta, la ganancia pendiente por interés y la salida del stock por CMV.</p>
      </div>

      <div class="exercise-block">
        <div class="exercise-head">
          <span class="exercise-number">9</span>
          <div>
            <h3>Cobro parcial de la venta</h3>
            <p class="exercise-note">40% de 261.360 = <strong>$ 104.544</strong>. Comisión bancaria 1,5% = <strong>$ 1.568,16</strong>. IVA CF sobre la comisión = <strong>$ 329,31</strong>. Neto al banco = <strong>$ 102.646,53</strong>.</p>
          </div>
          <div class="entry-tags" aria-label="Clasificación contable del asiento">
            <span class="entry-tag is-a" title="Activo">A</span>
            <span class="entry-tag is-rn" title="Resultado Negativo">R-</span>
          </div>
        </div>
        <div class="journal-entry" role="group" aria-label="Asiento de cobro parcial de la venta">
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>Banco Patagonia c/c................................... 102.646,53</code></div>
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-rn">R-</span><code>Intereses Perdidos...................................... 1.568,16</code></div>
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>IVA Crédito Fiscal........................................ 329,31</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-a">A</span><code>a Deudores Comerciales................................. 104.544,00</code></div>
        </div>
        <p class="impact-line">Impacto: baja el crédito con el cliente, ingresa el neto al banco y se reconoce el costo del servicio bancario.</p>
      </div>

      <div class="exercise-block">
        <div class="exercise-head">
          <span class="exercise-number">10</span>
          <div>
            <h3>Devengamiento al cierre</h3>
            <p class="exercise-note">Intereses de compras: 60% de 2.940 = <strong>$ 1.764</strong>. Intereses de ventas: 50% de 6.000 = <strong>$ 3.000</strong>. Intereses del plazo fijo: <strong>$ 4.800</strong>.</p>
          </div>
          <div class="entry-tags" aria-label="Clasificación contable del asiento">
            <span class="entry-tag is-a" title="Activo">A</span>
            <span class="entry-tag is-p" title="Pasivo">P</span>
            <span class="entry-tag is-rp" title="Resultado Positivo">R+</span>
            <span class="entry-tag is-rn" title="Resultado Negativo">R-</span>
          </div>
        </div>
        <div class="journal-entry" role="group" aria-label="Asiento de devengamiento al cierre">
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-rn">R-</span><code>Intereses Perdidos...................................... 1.764</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-a">A</span><code>a Intereses Perdidos No Devengados...................... 1.764</code></div>
          <div class="entry-line spacer" aria-hidden="true"></div>
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-p">P</span><code>Intereses Ganados No Devengados.......................... 3.000</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-rp">R+</span><code>a Intereses Ganados..................................... 3.000</code></div>
          <div class="entry-line spacer" aria-hidden="true"></div>
          <div class="entry-line"><span class="line-chip debe">D</span><span class="line-chip type is-a">A</span><code>Intereses a Cobrar....................................... 4.800</code></div>
          <div class="entry-line"><span class="line-chip haber">H</span><span class="line-chip type is-rp">R+</span><code>a Intereses Ganados..................................... 4.800</code></div>
        </div>
        <p class="impact-line">Impacto: se registran los resultados devengados y queda reconocido el derecho a cobrar el rendimiento del plazo fijo.</p>
      </div>
    </Accordion>

    <Accordion title="Resumen de importes clave" :icon="GraduationCap" number="Cálculos" color="teal">
      <div class="summary-grid">
        <div class="summary-card">
          <span class="summary-label">Capital inicial</span>
          <strong>$ 1.540.000</strong>
        </div>
        <div class="summary-card">
          <span class="summary-label">Deuda por compra financiada</span>
          <strong>$ 122.137,40</strong>
        </div>
        <div class="summary-card">
          <span class="summary-label">Pago parcial a proveedores</span>
          <strong>$ 30.534,35</strong>
        </div>
        <div class="summary-card">
          <span class="summary-label">Total de la venta</span>
          <strong>$ 261.360</strong>
        </div>
        <div class="summary-card">
          <span class="summary-label">Cobro bruto</span>
          <strong>$ 104.544</strong>
        </div>
        <div class="summary-card">
          <span class="summary-label">Neto acreditado al banco</span>
          <strong>$ 102.646,53</strong>
        </div>
      </div>
    </Accordion>

    <Accordion title="Libro mayor y control Debe = Haber" :icon="BookOpen" number="Mayor" color="purple">
      <div class="ledger-wrap">
        <p class="ledger-note">Mayorización resumida con saldo final por cuenta al cierre del modelo.</p>
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
              <tr><td>Caja</td><td>$ 620.000,00</td><td>$ 190.000,00</td><td>Deudor $ 430.000,00</td></tr>
              <tr><td>Mercaderías</td><td>$ 578.000,00</td><td>$ 72.000,00</td><td>Deudor $ 506.000,00</td></tr>
              <tr><td>Rodados</td><td>$ 350.000,00</td><td>$ 0,00</td><td>Deudor $ 350.000,00</td></tr>
              <tr><td>Deudores Comerciales</td><td>$ 351.360,00</td><td>$ 104.544,00</td><td>Deudor $ 246.816,00</td></tr>
              <tr><td>Capital</td><td>$ 0,00</td><td>$ 1.540.000,00</td><td>Acreedor $ 1.540.000,00</td></tr>
              <tr><td>IVA Crédito Fiscal</td><td>$ 22.576,71</td><td>$ 0,00</td><td>Deudor $ 22.576,71</td></tr>
              <tr><td>Intereses Perdidos No Devengados</td><td>$ 2.940,00</td><td>$ 1.764,00</td><td>Deudor $ 1.176,00</td></tr>
              <tr><td>Proveedores</td><td>$ 30.534,35</td><td>$ 122.137,40</td><td>Acreedor $ 91.603,05</td></tr>
              <tr><td>Fondo Fijo</td><td>$ 40.000,00</td><td>$ 6.050,00</td><td>Deudor $ 33.950,00</td></tr>
              <tr><td>Banco Patagonia c/c</td><td>$ 252.646,53</td><td>$ 110.534,35</td><td>Deudor $ 142.112,18</td></tr>
              <tr><td>Plazo Fijo</td><td>$ 80.000,00</td><td>$ 0,00</td><td>Deudor $ 80.000,00</td></tr>
              <tr><td>Gastos de Limpieza</td><td>$ 5.000,00</td><td>$ 0,00</td><td>Deudor $ 5.000,00</td></tr>
              <tr><td>Ventas</td><td>$ 0,00</td><td>$ 210.000,00</td><td>Acreedor $ 210.000,00</td></tr>
              <tr><td>IVA Débito Fiscal</td><td>$ 0,00</td><td>$ 45.360,00</td><td>Acreedor $ 45.360,00</td></tr>
              <tr><td>Intereses Ganados No Devengados</td><td>$ 3.000,00</td><td>$ 6.000,00</td><td>Acreedor $ 3.000,00</td></tr>
              <tr><td>Costo de Mercaderías Vendidas</td><td>$ 72.000,00</td><td>$ 0,00</td><td>Deudor $ 72.000,00</td></tr>
              <tr><td>Intereses Perdidos</td><td>$ 3.332,16</td><td>$ 0,00</td><td>Deudor $ 3.332,16</td></tr>
              <tr><td>Intereses Ganados</td><td>$ 0,00</td><td>$ 7.800,00</td><td>Acreedor $ 7.800,00</td></tr>
              <tr><td>Intereses a Cobrar</td><td>$ 4.800,00</td><td>$ 0,00</td><td>Deudor $ 4.800,00</td></tr>
            </tbody>
          </table>
        </div>

        <div class="check-grid">
          <div class="check-card">
            <span>Sumatoria movimientos Debe</span>
            <strong>$ 2.416.189,75</strong>
          </div>
          <div class="check-card">
            <span>Sumatoria movimientos Haber</span>
            <strong>$ 2.416.189,75</strong>
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
            <strong>$ 1.817.430,89</strong> + <strong>$ 80.332,16</strong>
            =
            <strong>$ 1.540.000,00</strong> + <strong>$ 139.963,05</strong> + <strong>$ 217.800,00</strong>
          </p>
          <p><strong>$ 1.897.763,05 = $ 1.897.763,05</strong></p>
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
                  <td>Caja, Mercaderías, Rodados, Deudores Comerciales, IVA CF, Intereses Perdidos No Devengados, Fondo Fijo, Banco Patagonia c/c, Plazo Fijo, Intereses a Cobrar</td>
                  <td><strong>$ 1.817.430,89</strong></td>
                </tr>
                <tr>
                  <td><span class="entry-tag is-rn">R-</span> Resultado Negativo</td>
                  <td>Gastos de Limpieza, Costo de Mercaderías Vendidas, Intereses Perdidos</td>
                  <td><strong>$ 80.332,16</strong></td>
                </tr>
                <tr>
                  <td><span class="entry-tag is-pn">PN</span> Patrimonio Neto</td>
                  <td>Capital</td>
                  <td><strong>$ 1.540.000,00</strong></td>
                </tr>
                <tr>
                  <td><span class="entry-tag is-p">P</span> Pasivo</td>
                  <td>Proveedores, IVA Débito Fiscal, Intereses Ganados No Devengados</td>
                  <td><strong>$ 139.963,05</strong></td>
                </tr>
                <tr>
                  <td><span class="entry-tag is-rp">R+</span> Resultado Positivo</td>
                  <td>Ventas, Intereses Ganados</td>
                  <td><strong>$ 217.800,00</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p class="ledger-note">La igualdad también se verifica por saldos: total saldos deudores = $ 1.897.763,05 y total saldos acreedores = $ 1.897.763,05.</p>
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
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 12px;
  background: var(--bg-card);
}

.equation-proof h4 {
  margin: 0 0 8px;
}

.equation-proof p {
  margin: 0;
  color: var(--text-secondary);
}

.equation-proof p + p {
  margin-top: 6px;
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

  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>