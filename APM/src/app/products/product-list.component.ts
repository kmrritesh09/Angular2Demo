import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector : 'pm-products',
    templateUrl : './product-list.component.html',
    styleUrls : ['./product-list.component.css'],
    // providers : [ProductService]
})
export class ProductListComponent implements OnInit {

    pageTitle : string = 'Product List';
    imageWidth : Number = 50;
    imageMargin : Number = 2;
    showImage : boolean = false;

    _listFilter : string;
    get listFilter() : string {
        return this._listFilter;
    }
    set listFilter(value : string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts : IProduct[];
    products : IProduct[] = [];

    constructor(private productservice : ProductService) {
    }
    
    performFilter(filterBy : string) : IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product : IProduct) => 
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
    
    ngOnInit() : void { 
        this.products = this.productservice.getProducts();
        this.filteredProducts = this.products;
    }
    
    toggleImage() : void  {
        this.showImage = !this.showImage;
    }

    onRatingClicked(message : string) : void {
        this.pageTitle = "Product List: " + message;
    }
}