<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Product;

class ProductController extends Controller
{
    // add product controller method 
    function addProduct(Request $request){
        $product = new Product;
        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->price = $request->input('price');
        $product->file_path = $request->file('file_path')->store('products');
        $product->save();
    
        return response()->json(['product' => $product, 'message' => 'Product created successfully']);
 
         }
         // get product controller method
         function getProducts (){
            $products = Product::all();
            return $products;
         }
         // delete product controller method
         function deleteProduct ($id) {
             $deletedProduct = Product::where('id',$id)->delete(); 
            if($deletedProduct){
                return response()->json('product deleted successfully');
            }else{
                return response()->json('product not found with id ' . $id);
            }
         }
         // upadate product controller method
         public function updateProduct ( Request $request,$id){
            $product = Product::find($id);
            if(!$product){
                return "Product not found with id " . $id;
            }
            if($request->input('name'))
            $product->name = $request->input('name');
            if($request->input('price'))
            $product->price = $request->input('price');
            if($request->input('description'))
            $product->description = $request->input('description');
            if($request->file('file_path')){
                $product->file_path = $request->file('file_path')->store('products');

            }
            $product->save();
            return 'Product updated successfully';
            // return $request->input();
         }
}
