<?php

namespace App\Exceptions;

use App\Traits\ApiResponder;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    use ApiResponder;

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        // $this->reportable(function (Throwable $e) {
        //     //
        // });
        $this->renderable(function (Throwable $exception, $request)
        {
            if($request->wantsJson()){
                if ($exception instanceof MethodNotAllowedHttpException) {
                    return $this->errorResponse('The specified method for the request is invalid', 405);
                }
        
                if ($exception instanceof NotFoundHttpException) {
                    return $this->errorResponse('The specified URL or Object cannot be found', 404);
                }
        
                if ($exception instanceof HttpException) {
                    return $this->errorResponse($exception->getMessage(), $exception->getStatusCode());
                }
            }
        });
    }
}
