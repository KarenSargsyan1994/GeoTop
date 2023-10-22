<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Image;

class ImageController extends Controller
{
    public function destroy($id)
    {
        if (Image::where('id', $id)->exists()) {
            $image = Image::find($id);
            $image->delete();
            return response()->json(['message' => 'Image deleted successful']);
        } else {
            return response()->json(['message' => 'Image not found']);
        }
    }
}
