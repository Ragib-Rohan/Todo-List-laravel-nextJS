<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\todo_list;

class to_do_list_seeders extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        $data=[
            [
                'id' => 1,
                'list_name' => 'Task 1',
                'completed_flag' => 0,
            ],
            [
                'id' => 2,
                'list_name' => 'Task 2',
                'completed_flag' => 0,
            ],
        ];
        todo_list::insert($data);

    }
}
