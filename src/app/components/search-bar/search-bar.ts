import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { Auto } from '../../interfaces/auto';
@Component({
  imports: [FontAwesomeModule],

  selector: 'app-search-bar',
  styleUrl: './search-bar.css',
  templateUrl: './search-bar.html',
})
export class SearchBar implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;


  @Input()
  autos:Auto[]=[]

  @Output() onSelectCar=new EventEmitter<Auto>();
  selectedAutos:Auto[]=[]
  openedId:number = 0;

  // AJOUT : mémoriser les filtres
  searchText:string = '';
  maxPrice:number = 0;          // 0 = pas de limite
  sortOrder:string = '';        // '' | 'asc' | 'desc'

  ngOnInit() {
    this.applyFilters();
  }

  // AJOUT : applique recherche + prix max + tri en même temps
  applyFilters(){
    const text = this.searchText.toLowerCase();

    this.selectedAutos = this.autos.filter(
      auto => (auto.brand.toLowerCase().includes(text) ||
               auto.model.toLowerCase().includes(text))
              && (this.maxPrice == 0 || auto.price <= this.maxPrice)
    );

    if (this.sortOrder == 'asc') {
      this.selectedAutos.sort((a, b) => a.price - b.price);
    }
    if (this.sortOrder == 'desc') {
      this.selectedAutos.sort((a, b) => b.price - a.price);
    }
  }

  // la méthode de la prof : elle garde son nom, elle passe par applyFilters
  selectAutos(selectedBrand:string){
    this.searchText = selectedBrand;
    this.applyFilters();
  }

  // AJOUT : filtre par prix max
  selectMaxPrice(value:string){
    this.maxPrice = Number(value);
    this.applyFilters();
  }

  // AJOUT : tri par prix
  sortByPrice(order:string){
    this.sortOrder = order;
    this.applyFilters();
  }

  selectCar(auto:Auto){
    if (this.openedId == auto.id) {
      this.openedId = 0;
    } else {
      this.openedId = auto.id;
    }

    this.onSelectCar.emit(auto);
  }
}