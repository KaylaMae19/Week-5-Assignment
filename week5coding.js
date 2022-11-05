class Products {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    describe () {
        return `${this.name} is priced at: ${this.price}.`;
    }
}

class Category {
    constructor(name) {
        this.name = name;
        this.products = [];
    }
    addProduct (product) {
        if( product instanceof Products) {
            this.products.push (product);
        }else{
            throw new Error (`Product not valid. Please select vaild: ${product}`);
        }
    }
    
    describe() {
        return ` ${this.name} has ${this.products.length} products.`;
    }
}


class Menu {
    constructor () {
        this.category = [];
        this.selectedCategory = null;
    }

    start () {
        let selection = this.showMainMenuOptions();
        while( selection != 0) {
            switch (selection) {
                case '1' :
                    this.createCategory();
                    break;
                case '2' :
                    this.viewCategory();
                    break;
                case '3' :
                    this.deleteCategory();
                    break;
                case '4' : 
                    this.displayCategory();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye.');
    }
    showMainMenuOptions() {
        return prompt(`
        0) Exit
        1) Create new category
        2) View category
        3) Delete category
        4) Display all categories`);
    }
    showCategoryMenuOptions (categoryInfo) {
        return prompt (`
        0) Back
        1) Create product
        2) Delete product
        ------------------
        ${categoryInfo}
        `);
    }
    displayCategory () {
        let categoryString = "";
        for (let i = 0; i < this.category.length; i++) {
            categoryString += i + ') ' + this.category[i].name + '\n';
        }
        alert(categoryString);
    }

    createCategory () {
        let name = prompt( "Enter Category name: " );
        this.category.push(new Category(name));
    }

    viewCategory () {
        let index = prompt( "Enter the index of the Category you want to view: ");
        if(index > -1 && index < this.category.length) {
            this.selectedCategory = this.category[index];
            let description = 'Category Name' + this.selectedCategory.name + '\n';

            for(let i = 0; i < this.selectedCategory.products.length; i++) {
                description += i + ') ' + this.selectedCategory.products[i].name + ' - ' + this.selectedCategory.products[i].price + '\n';
            }

            let selection = this.showCategoryMenuOptions(description);
            switch (selection) {
                case '1': 
                this.createProduct();
                break;
                case '2' :
                    this.deleteProduct();
            }
         }
    }

    deleteCategory() {
        let index = prompt("Enter index of category you wish to delete:");
        if(index > -1 && index < this.category.length) {
            this.category.splice(index, 1);
        }
    }
    createProduct () {
        let name = prompt("Enter name of Product");
        let price = prompt("Enter price of product");
        this.selectedCategory.products.push(new Products(name, price));
        
    }
    deleteProduct() {
        let index = prompt("Enter the index of the product you wish to delete:");
        if(index > -1 && index < this.selectedCategory.products.length) {
            this.selectedCategory.products.splice(index, 1);
        }
    }
}

let menu = new Menu();

menu.start();