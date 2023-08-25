<?php

namespace App\Http\Controllers;

use App\Models\todo_list;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Ramsey\Uuid\Type\Integer;
use Illuminate\Support\Facades\DB;

class ToDoListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        return response()->json(todo_list::latest()->get());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $input = [
            'task_name' =>$request->input('task_name'),
            'completed_flag' =>$request->input('is_done'),
        ];

        // return  $input;
        // INSERT INTO `todo_lists` (`id`, `task_name`, `completed_flag`) VALUES (NULL, 'dd', 'dd');
        // $result=DB::insert();
// return $input;
            DB::table('todo_lists')->insert( 
                [
                    'task_name' => $request->input('task_name'),
                    'completed_flag' => $request->input('is_done'),
                ]
            );
            return response()->json('Task added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(todo_list $to_do_list)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(todo_list $to_do_list)
    {
        //
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, todo_list $todo_list)
    {   
        // $todo_list->task_name=$request->task_name;
        // $todo_list->completed_flag=$request->is_done;
        // $todo_list->save();
        DB::table('todo_lists')
            ->where('id', $request->edit_id )
            ->update( [
                    'task_name' => $request->task_name,
                    'completed_flag' => $request->is_done,
                    ]);
        return response()->json('Task has been updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($todo_list)
    {
        //
        // return $to_do_list;
        DB::table('todo_lists')->where('id', $todo_list)->delete();
         return response()->json('Data Deleted');
    }
    public function check_task( $todo_list)
    {
        //
        // return $to_do_list;
        // return $todo_list;
        DB::table('todo_lists')
            ->where('id', $todo_list)
            ->update([
                'completed_flag' => DB::raw('CASE 
                    WHEN completed_flag = 0 THEN 1 
                    WHEN completed_flag = 1 THEN 0 
                    ELSE completed_flag 
            END')
        ]);
         return response()->json('Task Completed');
    }
}
