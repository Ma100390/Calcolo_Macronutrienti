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

  obiettivoCalorie: number | undefined;
  calcoloP: number | undefined;

  calculateBMI(): void {
   if (this.age && this.peso && this.gender && this.altezza && this.giorni && this.obiettivo) {
      let bmr: number | undefined;

      if (this.gender === 'male') {
        // Calcolo BMR per gli uomini
        bmr = (10 * this.peso) + 5 + (6.25 * this.altezza) - (5 * this.age) ;
      } else if (this.gender === 'female') {
        // Calcolo BMR per le donne
        bmr = (10 * this.peso) + (6.25 * this.altezza) - (5 * this.age) - 161;
      } else {
        // Genere non specificato (gestione errore)
        this.resultMessage = 'Genere non specificato.';
        return;
      }

      if (bmr) {
        // Calcolo del fabbisogno calorico totale
        const totalCalories = bmr * this.giorni;
        if (this.obiettivo === 'perdere') {
          // Perdere Peso (Lose Weight) option selected
          this.obiettivoCalorie = totalCalories - 500; // Calorie obiettivo per perdere peso
        
          // Calcolo delle proteine in grammi
          // 2.1 grammi di proteine per chilogrammo di peso corporeo
          this.proteine = 2.1 * this.peso; // Peso corporeo in kg
         
          // Calcolo delle calorie provenienti dalle proteine
          const proteineS = this.proteine * 4; // 1g proteine = 4 calorie
          
          // Calcolo dei grassi in grammi
          // 30% delle calorie totali provengono dai grassi
          const calorieGrassi = 0.30 * this.obiettivoCalorie;
          this.grassi = calorieGrassi / 9; // 1g grassi = 9 calorie
        
          // Calcolo dei carboidrati in grammi
          // Il resto delle calorie provengono dai carboidrati
          const calorieCarboidrati = proteineS + calorieGrassi;
          const totaleCalarie = this.obiettivoCalorie - calorieCarboidrati 
          this.carboidrati = totaleCalarie / 4; // 1g carboidrati = 4 calorie
        
        } else if (this.obiettivo === 'nulla') {
          // Mantenere Peso (Maintain Weight) option selected
          this.obiettivoCalorie = totalCalories;
          this.grassi = (this.obiettivoCalorie * 0.25) / 9;
          this.proteine = (this.obiettivoCalorie * 0.25) / 4;
          this.carboidrati = (this.obiettivoCalorie * 0.50) /4;
        } else if (this.obiettivo === 'aumentare') {
            // Aumentare il Peso (Gain Weight) option selected
            this.obiettivoCalorie = totalCalories + 250; // Calorie obiettivo per perdere peso
        
            // Calcolo delle proteine in grammi
            // 2.1 grammi di proteine per chilogrammo di peso corporeo
            this.proteine = 1.7 * this.peso; // Peso corporeo in kg
           
            // Calcolo delle calorie provenienti dalle proteine
            const proteineS = this.proteine * 4; // 1g proteine = 4 calorie
            
            // Calcolo dei grassi in grammi
            // 30% delle calorie totali provengono dai grassi
            const calorieGrassi = 0.25 * this.obiettivoCalorie;
            this.grassi = calorieGrassi / 9; // 1g grassi = 9 calorie
          
            // Calcolo dei carboidrati in grammi
            // Il resto delle calorie provengono dai carboidrati
            const calorieCarboidrati = proteineS + calorieGrassi;
            const totaleCalarie = this.obiettivoCalorie - calorieCarboidrati 
            this.carboidrati = totaleCalarie / 4; // 1g carboidrati = 4 calorie
          
        } else {
          // Default or invalid selection
          this.obiettivoCalorie = totalCalories;
        }
      
        // Genera il messaggio di risultato
        this.resultMessage1 = `Il tuo BMR è: ${bmr.toFixed(2)} kcal al giorno.`;
        this.resultMessage2 += ` Il tuo fabbisogno calorico totale è: ${totalCalories.toFixed(2)} kcal al giorno.`;
        this.resultMessage3 += ` Calorie finali sono: ${this.obiettivoCalorie.toFixed(2)} kcal al giorno.`;
        this.resultMessage4 += ` Totale grammi di grassi è: ${this.grassi?.toFixed(2)} g al giorno.`;
        this.resultMessage5 += ` Totale grammi di proteine è: ${this.proteine?.toFixed(2)} g al giorno.`;
        this.resultMessage6 += ` Totale grammi di carboidrati è: ${this.carboidrati?.toFixed(2)} g al giorno.`;
      } else  {
        // Errore durante il calcolo del BMR (gestione errore)
        this.resultMessage = 'Impossibile calcolare il BMR. Genere non specificato.';
      }
    } else {
      // Dati incompleti (gestione errore)
      this.resultMessage = 'Per favore inserisci tutti i dati necessari.';
    }
  }
}
