import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/auth.context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/library';
import { Button } from './ui/button';
import { FormLogin } from './compound/login/partial';
import { Logo } from './logo';
import { GenericFormProps } from '@/global-type/component-type';
import { FieldValues } from 'react-hook-form';
import { hideToast } from '@/features/ui/uiSlice';

export const AuthContainer = <T extends FieldValues>({
  className,
  isLogin = false,
  isPending = false,
  form,
  onSubmit,
  children,
}: GenericFormProps<T>) => {
  const { dialog, setDialog } = useContext(AuthContext);
  const toastMessage = useSelector((state: RootState) => state.ui.toastMessage);
  const dispatch = useDispatch();

  const closeDialog_Click = () => {
    setDialog(undefined);
  };

  const dialogMode_Click = () => {
    closeDialog_Click();
    setDialog(dialog !== 'LOG_IN' ? 'LOG_IN' : 'REGISTER');
  };

  useEffect(() => {
    if (toastMessage) {
      setTimeout(() => {
        dispatch(hideToast());
      }, 10000);
    }
  }, [toastMessage]);

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
              <Logo className='w-full' />
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
              <p className='text-field-warning leading-xs mb-4 flex h-1 items-center text-center text-sm font-medium'>
                {toastMessage}
              </p>
            </FormLogin.Content>
          </FormLogin.Wrapper>
        </FormLogin.Root>
      </div>
    </>
  );
};
