import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  age: number | undefined;
  peso: number | undefined;
  gender: string | undefined;
  altezza: number | undefined;
  
  grassi: number | undefined;
  proteine: number | undefined;
  carboidrati: number | undefined;
  obiettivo: string | undefined;
  giorni: number | undefined;
  resultMessage: string = '';
  resultMessage1: string = ''; 
  resultMessage2: string = '';
  resultMessage3: string = '';
  resultMessage4: string = '';
  resultMessage5: string = '';
  resultMessage6: string = '';
  resultMessage7: string = '';
  obiettivoCalorie: number | undefined;
  calcoloP: number | undefined;
  resetFormFields(): void {
    this.age = undefined;
    this.peso = undefined;
    this.gender = undefined;
    this.altezza = undefined;
    this.giorni = undefined;
    this.obiettivo = undefined;
  
    
    this.resultMessage1 = '';
    this.resultMessage2 = '';
    this.resultMessage3 = '';
    this.resultMessage4 = '';
    this.resultMessage5 = '';
    this.resultMessage6 = '';
    this.resultMessage7 = '';
    this.obiettivoCalorie = undefined;
    this.calcoloP = undefined;
    this.grassi = undefined;
    this.proteine = undefined;
    this.carboidrati = undefined;
  }
  reset(): void{
    this.resultMessage = '';
  }
  calculateBMI(): void {
    if (this.age && this.peso && this.gender && this.altezza && this.giorni && this.obiettivo) {
      if (this.age < 18 || this.age > 80 || this.peso < 45 || this.peso > 150 || this.altezza < 120 || this.altezza > 250) {
        this.resultMessage = 'Dati non validi o requisiti non soddisfatti.';
        this.resetFormFields();
        return;
      }
      const pesoRegex = /^[0-9]+(\.[0-9])?$/; // Regex per consentire al massimo una cifra dopo la virgola
      if (!pesoRegex.test(this.peso.toString())) {
        this.resultMessage = 'Il formato del peso non è valido. Inserisci al massimo una cifra dopo la virgola.';
        this.resetFormFields();
        return;
      }

      let bmr: number | undefined;
  
      if (this.gender === 'male') {
        // Calcolo BMR per gli uomini
        bmr = (10 * this.peso) + 5 + (6.25 * this.altezza) - (5 * this.age);
      } else if (this.gender === 'female') {
        // Calcolo BMR per le donne
        bmr = (10 * this.peso) + (6.25 * this.altezza) - (5 * this.age) - 161;
      } else {
        // Genere non specificato (gestione errore)
        this.resultMessage = 'Genere non specificato.';
        this.resetFormFields();
        return;
      }
  
      if (bmr) {
        // Calcolo del fabbisogno calorico totale
        const totalCalories = bmr * this.giorni;
        if (this.obiettivo === 'Definizione') {
          // Perdere Peso (Lose Weight) option selected
          this.obiettivoCalorie = totalCalories - 500;
  
          // Calcolo delle proteine in grammi
          this.proteine = 2.1 * this.peso;
  
          // Calcolo delle calorie provenienti dalle proteine
          const proteineCalories = this.proteine * 4;
  
          // Calcolo dei grassi in grammi
          const fatCalories = 0.30 * this.obiettivoCalorie;
          this.grassi = fatCalories / 9;
  
          // Calcolo dei carboidrati in grammi
          const carbCalories = this.obiettivoCalorie - proteineCalories - fatCalories;
          this.carboidrati = carbCalories / 4;
        } else if (this.obiettivo === 'Mantenimento') {
          // Mantenere Peso (Maintain Weight) option selected
          this.obiettivoCalorie = totalCalories;
          this.grassi = (this.obiettivoCalorie * 0.25) / 9;
          this.proteine = (this.obiettivoCalorie * 0.25) / 4;
          this.carboidrati = (this.obiettivoCalorie * 0.50) / 4;
        } else if (this.obiettivo === 'Massa') {
          // Aumentare il Peso (Gain Weight) option selected
          this.obiettivoCalorie = totalCalories + 250;
  
          // Calcolo delle proteine in grammi
          this.proteine = 1.7 * this.peso;
  
          // Calcolo delle calorie provenienti dalle proteine
          const proteineCalories = this.proteine * 4;
  
          // Calcolo dei grassi in grammi
          const fatCalories = 0.25 * this.obiettivoCalorie;
          this.grassi = fatCalories / 9;
  
          // Calcolo dei carboidrati in grammi
          const carbCalories = this.obiettivoCalorie - proteineCalories - fatCalories;
          this.carboidrati = carbCalories / 4;
        } else {
          // Opzione non valida
          this.obiettivoCalorie = totalCalories;
        }
  
        // Genera il messaggio di risultato
        this.resultMessage1 = `METABOLISMO BASALE: ${bmr.toFixed(2)} KCAL.`;
        this.resultMessage2 = `FABBISOGNO CALORICO: ${totalCalories.toFixed(2)} KCAL.`;
        this.resultMessage3 = `Calorie per il tuo obiettivo di '${this.obiettivo}': ${this.obiettivoCalorie.toFixed(2)} KCAL.`;
        this.resultMessage7 = 'MACRONUTRIENTI';
        this.resultMessage6 = `Carboidrati: ${this.carboidrati?.toFixed(2)} gr.`;
        this.resultMessage5 = `Proteine: ${this.proteine?.toFixed(2)} gr.`;
        this.resultMessage4 = `Grassi: ${this.grassi?.toFixed(2)} gr.`;
      } else {
        // Errore durante il calcolo del BMR (gestione errore)
        this.resultMessage = 'Impossibile calcolare.';
        this.resetFormFields();
      }
    } else {
      // Dati incompleti (gestione errore)
      this.resultMessage = 'Per favore inserisci tutti i dati necessari.';
      this.resetFormFields();
    }
   
  }
  
}