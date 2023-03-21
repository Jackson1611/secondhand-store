package inventory.store.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import inventory.store.domain.Product;
import inventory.store.domain.ProductRepository;

@RestController
@RequestMapping("/products")
@CrossOrigin("*")

public class StoreController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProducts() {
    	return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
		return productRepository.findById(id).get();
	}
    

    @PostMapping
    public Product saveProductDetails(@RequestBody Product product) {
		return productRepository.save(product);
	}

    @PutMapping("/{id}")
    public Product updateProduct(@RequestBody Product product) {
		return productRepository.save(product);
	}

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteProductById(@PathVariable Long id) {
    	productRepository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
