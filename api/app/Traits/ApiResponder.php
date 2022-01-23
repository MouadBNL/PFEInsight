<?php

namespace App\Traits;

trait ApiResponder {

    protected function successResponse($data = null, $message = 'ok', $code = 200)
	{
		return response()->json([
			'status'=> 'success', 
			'message' => $message, 
			'data' => $data
		], $code);
	}

    protected function invalidResponse($data = null, $message = null, $code = 400)
	{
		return response()->json([
			'status'=> 'invalid', 
			'message' => $message, 
			'data' => $data
		], $code);
	}

	protected function errorResponse($message = null, $code)
	{
		return response()->json([
			'status'=>'error',
			'message' => $message,
			'data' => null
		], $code);
	}
    
}