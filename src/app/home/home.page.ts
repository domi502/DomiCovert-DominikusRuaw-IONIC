import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  metriks = ['Panjang', 'Berat', 'Suhu'];
  selectedMetrik = '';
  satuanAwal = '';
  satuanAkhir = '';
  nilaiAwal = '';
  hasilKonversi = '';

  onChangeMetrik() {
    this.satuanAwal = '';
    this.satuanAkhir = '';
    this.nilaiAwal = '';
    this.hasilKonversi = '';
  }

  getSatuanAwal() {
    if (this.selectedMetrik) {
      switch (this.selectedMetrik) {
        case 'Panjang':
          return ['Meter', 'Centimeter', 'Kilometer'];
        case 'Berat':
          return ['Gram', 'Kilogram', 'Miligram'];
        case 'Suhu':
          return ['Celsius', 'Fahrenheit'];
        default:
          return [];
      }
    } else {
      return [];
    }
  }

  getSatuanAkhir() {
    if (this.satuanAwal) {
      switch (this.selectedMetrik) {
        case 'Panjang':
          return ['Meter', 'Centimeter', 'Kilometer'].filter(satuan => satuan !== this.satuanAwal);
        case 'Berat':
          return ['Gram', 'Kilogram', 'Miligram'].filter(satuan => satuan !== this.satuanAwal);
        case 'Suhu':
          return ['Celsius', 'Fahrenheit'].filter(satuan => satuan !== this.satuanAwal);
        default:
          return [];
      }
    } else {
      return [];
    }
  }

  onChangeNilaiAwal() {
    this.updateHasilKonversi();
  }

  updateHasilKonversi() {
    const nilaiAwalNumber = parseFloat(this.nilaiAwal);
    if (!isNaN(nilaiAwalNumber)) {
      switch (this.selectedMetrik) {
        case 'Panjang':
          this.hasilKonversi = this.konversiPanjang(this.nilaiAwal, this.satuanAwal, this.satuanAkhir);
          break;
        case 'Berat':
          this.hasilKonversi = this.konversiBerat(this.nilaiAwal, this.satuanAwal, this.satuanAkhir);
          break;
        case 'Suhu':
          this.hasilKonversi = this.konversiSuhu(this.nilaiAwal, this.satuanAwal, this.satuanAkhir);
          break;
        default:
          this.hasilKonversi = '';
      }
    } else {
      this.hasilKonversi = 'Nilai input tidak valid';
    }
  }

  konversiPanjang(nilaiAwal: string, satuanAwal: string, satuanAkhir: string): string {
    switch (satuanAwal) {
      case 'Meter':
        switch (satuanAkhir) {
          case 'Centimeter':
            return (parseFloat(nilaiAwal) * 100).toString();
          case 'Kilometer':
            return (parseFloat(nilaiAwal) / 1000).toString();
          default:
            return nilaiAwal;
        }
      case 'Centimeter':
        switch (satuanAkhir) {
          case 'Meter':
            return (parseFloat(nilaiAwal) / 100).toString();
          case 'Kilometer':
            return (parseFloat(nilaiAwal) / 100000).toString();
          default:
            return nilaiAwal;
        }
      case 'Kilometer':
        switch (satuanAkhir) {
          case 'Meter':
            return (parseFloat(nilaiAwal) * 1000).toString();
          case 'Centimeter':
            return (parseFloat(nilaiAwal) * 100000).toString();
          default:
            return nilaiAwal;
        }
      default:
        return nilaiAwal;
    }
  }

  konversiBerat(nilaiAwal: string, satuanAwal: string, satuanAkhir: string): string {
    switch (satuanAwal) {
      case 'Gram':
        switch (satuanAkhir) {
          case 'Kilogram':
            return (parseFloat(nilaiAwal) / 1000).toString();
          case 'Miligram':
            return (parseFloat(nilaiAwal) * 1000).toString();
          default:
            return nilaiAwal;
        }
      case 'Kilogram':
        switch (satuanAkhir) {
          case 'Gram':
            return (parseFloat(nilaiAwal) * 1000).toString();
          case 'Miligram':
            return (parseFloat(nilaiAwal) * 1000000).toString();
          default:
            return nilaiAwal;
        }
      case 'Miligram':
        switch (satuanAkhir) {
          case 'Gram':
            return (parseFloat(nilaiAwal) / 1000).toString();
          case 'Kilogram':
            return (parseFloat(nilaiAwal) / 1000000).toString();
          default:
            return nilaiAwal;
        }
      default:
        return nilaiAwal;
    }
  }

  konversiSuhu(nilaiAwal: string, satuanAwal: string, satuanAkhir: string): string {
    switch (satuanAwal) {
      case 'Celsius':
        switch (satuanAkhir) {
          case 'Fahrenheit':
            return (parseFloat(nilaiAwal) * 9 / 5 + 32).toString();
          default:
            return nilaiAwal;
        }
      case 'Fahrenheit':
        switch (satuanAkhir) {
          case 'Celsius':
            return ((parseFloat(nilaiAwal) - 32) * 5 / 9).toString();
          default:
            return nilaiAwal;
        }
      default:
        return nilaiAwal;
    }
  }

  resetForm() {
    this.selectedMetrik = '';
    this.satuanAwal = '';
    this.satuanAkhir = '';
    this.nilaiAwal = '';
    this.hasilKonversi = '';
  }
}