<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BandController extends Controller
{
    public function showBands()
    {
        $bands = DB::table("bands")->select()->get();
        // //dd($customers);
        // return view('customers', ["customers" => $customers]);
        return Inertia::render('Bands/BandsDB', ["bands"=>$bands, "csrf_token"=>csrf_token()]);
    }

    public function updateBand(Request $request)
    {
        $bandsToUpdate = $request->bands;
        foreach($bandsToUpdate as $band)
        {
            DB::table("bands")->where("Id", "=", $band["Id"])->update([
                "title"=>$band["title"], 
                "leadArtist"=>$band["leadArtist"], 
                "genres"=>$band["genres"], 
                "yearFoundation"=>$band["yearFoundation"], 
                "origin"=>$band["origin"], 
                "website"=>$band["website"] ]);
        }
    }
}
