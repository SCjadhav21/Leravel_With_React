<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Product;

class ProductController extends Controller
{
    function addProduct(Request $request){
        $product = new Product;
        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->price = $request->input('price');
        $product->file_path = $request->file('file')->store('products');
        $product->save();
    
        return response()->json(['product' => $product, 'message' => 'Product created successfully']);
 
         }
         function getProducts (){
            $products = Product::all();
            return $products;
         }
}
