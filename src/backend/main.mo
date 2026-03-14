import Array "mo:core/Array";
import Text "mo:core/Text";
import List "mo:core/List";

actor {
  type Category = {
    #laddu;
    #chutneyPowder;
  };

  type Product = {
    name : Text;
    category : Category;
    description : Text;
    ingredients : [Text];
    nutritionalBenefits : [Text];
    usageSuggestions : [Text];
    shelfLife : Text;
  };

  let products = List.empty<Product>();

  // Initialize with some sample products
  public shared ({ caller }) func initSampleProducts() : async () {
    let laddu : Product = {
      name = "Besan Laddu";
      category = #laddu;
      description = "Traditional Indian sweet made from gram flour, ghee, and sugar.";
      ingredients = ["Gram Flour", "Ghee", "Sugar", "Cardamom"];
      nutritionalBenefits = ["Rich in protein", "Good source of energy"];
      usageSuggestions = ["Festive occasions", "Dessert"];
      shelfLife = "2 weeks";
    };

    let chutneyPowder : Product = {
      name = "Coconut Chutney Powder";
      category = #chutneyPowder;
      description = "Dry chutney powder made from coconut and spices.";
      ingredients = ["Coconut", "Red Chili", "Coriander Seeds"];
      nutritionalBenefits = ["Rich in fiber", "Contains healthy fats"];
      usageSuggestions = ["Pair with rice", "Sprinkle on dosas"];
      shelfLife = "3 months";
    };

    products.add(laddu);
    products.add(chutneyPowder);
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : Category) : async [Product] {
    let filtered = products.filter(
      func(product) {
        product.category == category;
      }
    );
    filtered.toArray();
  };

  public shared ({ caller }) func addProduct(product : Product) : async () {
    products.add(product);
  };
};
