import { cn } from '@/lib/utils';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { X } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/auth.context';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/library';
import { Button } from './ui/button';
import { FormLogin } from './compound/login/partial';
import { Logo } from './logo';

type GenericFormProps<T> = {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  children?: React.ReactNode;
  className?: string;
  isLogin: boolean;
  isPending?: boolean;
};

export const AuthContainer = <T,>({
  className,
  isLogin = false,
  isPending = false,
  form,
  onSubmit,
  children,
}: GenericFormProps<T>) => {
  const { dialog, setDialog } = useContext(AuthContext);
  const { loading } = useSelector((state: RootState) => state.auth);

  const closeDialog_Click = () => {
    setDialog(undefined);
  };

  const dialogMode_Click = () => {
    closeDialog_Click();
    setDialog(dialog !== 'LOG_IN' ? 'LOG_IN' : 'REGISTER');
  };

  return (
    <>
      <div
        className={cn(
          'm-auto flex h-fit w-fit items-center justify-center gap-y-4 rounded-[12px] bg-white p-8 drop-shadow-2xl',
          className
        )}
      >
        <X
          onClick={closeDialog_Click}
          className='absolute top-2 right-2 cursor-pointer justify-self-end'
        />
        <FormLogin.Root className='h-fit w-full border-0 p-0'>
          <FormLogin.Wrapper className='h-fit w-full border-0 p-0'>
            <FormLogin.Content className='flex flex-col justify-start gap-y-5 p-0'>
              <Logo />
              <div className='w-full gap-y-2'>
                <h1 className='mb-3 text-3xl leading-12 font-bold'>
                  {isLogin == true ? 'Login' : 'Register'}
                </h1>
                <p className='text-md leading-md flex h-7.5 w-fit font-semibold tracking-tight text-neutral-700'>
                  {!isLogin
                    ? `Create your account to start borrowing books.`
                    : `Sign in to manage your library account.`}
                </p>
              </div>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {children}
                {!isLogin && (
                  <>
                    <p className='mt-1 mb-3 text-xs leading-4.5 font-normal'>
                      By sign up, you agree to our{' '}
                      <span className='text-primary cursor-pointer'>
                        Term Service
                      </span>{' '}
                      &{' '}
                      <span className='text-primary cursor-pointer'>
                        Privacy Policy
                      </span>
                    </p>
                  </>
                )}
                <Button
                  type='submit'
                  className='mb-5 ml-0 flex w-88 justify-start'
                  disabled={isPending}
                >
                  {isLogin == true ? 'Login' : 'Register'}
                </Button>
              </form>
              <p className='text-md flex justify-center px-6 leading-5 font-semibold text-black'>
                {`${!isLogin ? 'Already' : `Don't`} have an account? `}
                <span
                  onClick={dialogMode_Click}
                  className='text-primary-500 text-md ml-1 cursor-pointer font-bold'
                >
                  {isLogin == true ? ' Register' : ' Log In'}
                </span>
              </p>
            </FormLogin.Content>
          </FormLogin.Wrapper>
        </FormLogin.Root>
      </div>
    </>
  );
};
