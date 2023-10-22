<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\Image;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function index()
    {
        $items = Item::with('images')->get();
        return response()->json(['items' => $items]);

    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([

            '*' => 'required',
        ]);
        $data = $request->except('images');
        $item = Item::create($data);
        foreach ($request->file('images') as $imagefile) {
            $image = new Image;
            $path = $imagefile->store('/images/resource', ['disk' => 'my_files']);
            $image->url = $path;
            $image->item_id = $item->id;
            $image->save();
        }
        return response()->json(['status' => 'success']);
    }

    public function show($id)
    {
        $item = Item::with('images')->find($id);
        if (!empty($item)) {
            return response()->json(['item' => $item]);
        }
    }

    public function update(Request $request, $id)
    {
        if (Item::where('id', $id)->exists()) {
            $item = Item::find($id);
            $validatedData = $request->validate([

                '*' => 'required',
                'images' => 'nullable',
            ]);
            $item->city = $request->city;
            $item->date = $request->date;
            $item->code = $request->code;
            $item->phone = $request->phone;
            $item->street = $request->street;
            $item->building = $request->building;
            $item->description = $request->description;
            $item->roomCount = $request->roomCount;
            $item->price = $request->price;
            $item->area = $request->area;

            $item->save();
            $images = $request->file('images');

            if ($images && is_array($images)) {
                foreach ($request->file('images') as $imagefile) {
                    $image = new Image;
                    $path = $imagefile->store('/images/resource', ['disk' => 'my_files']);
                    $image->url = $path;
                    $image->item_id = $item->id;
                    $image->save();
                }
            }
            return response()->json(['message' => 'item updated successful']);
        } else {
            return response()->json(['message' => 'item not found']);
        }

    }

    public function destroy($id)
    {
        if (Item::where('id', $id)->exists()) {
            $item = Item::find($id);
            $item->delete();
            return response()->json(['message' => 'item deleted successful']);
        } else {
            return response()->json(['message' => 'item not found']);
        }
    }
}
