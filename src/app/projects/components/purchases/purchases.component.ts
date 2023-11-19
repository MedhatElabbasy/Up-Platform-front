import { Component } from '@angular/core';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent {
  addRow(){
    console.log("alooo");
    const container = document.getElementById('dina');
    const newRow = document.createElement('div');
    newRow.classList.add('row', 'mt-3');
    newRow.innerHTML =`<div class="col-lg-5">
    <div class="">
        <input
        type="text"
        class="input-text"
        style=" padding: 8px;
        border: 1px solid rgb(204, 204, 204);
        border-radius: 7px;
        font-size: 18px;
        width: 100%;"
      />
    </div>
</div>
<div class="col-lg-5" >
    <div class="">
        <input
        type="text"
        class="input-text"
        style=" padding: 8px;
        border: 1px solid rgb(204, 204, 204);
        border-radius: 7px;
        font-size: 18px;
        width: 100%;"
      />
      
    </div>
</div>
<div class="col-lg-2">
<button id="remove" style="background-color: #07487C;
color:#fff;
padding: 3px 15px;
    margin-top: 5px;
    border: none;
    border-radius: 10px;">Remove</button>
</div>`
container?.appendChild(newRow);
// const removeButton = document.createElement('div');
// removeButton.classList.add('col-lg-2');
// removeButton.innerHTML =`<button>remove</button>`
//container?.appendChild(removeButton)
//const remove = document.getElementById('remove');
const removeButton = newRow.querySelector('#remove');
    removeButton?.addEventListener('click', function() {
        container?.removeChild(newRow);
    });
  }

  
}
