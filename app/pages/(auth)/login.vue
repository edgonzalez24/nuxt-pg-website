<script setup lang="ts">
import * as z from 'zod';
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui';

definePageMeta({
  layout: 'login-layout',
  middleware: 'not-authenticated',
});

const toast = useToast();
const cookieLoginEmail = useCookie<string|null>('login_email', {
  sameSite: 'strict',
  maxAge: 60 * 60 * 24 * 30, // 30 days
});
const { login } = useAuthentication();
const isPosting = ref(false);

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Correo electrónico',
    placeholder: 'Ingresa tu correo electrónico',
    required: true,
    defaultValue: cookieLoginEmail.value || undefined,
  },
  {
    name: 'password',
    label: 'Contraseña',
    type: 'password',
    placeholder: 'Ingresa tu contraseña',
    required: true,
  },
  {
    name: 'remember',
    label: 'Recuérdame',
    type: 'checkbox',
    defaultValue: !!cookieLoginEmail.value,
  },
];

const providers = [
  {
    label: 'Google',
    icon: 'i-simple-icons-google',
    onClick: () => {
      toast.add({ title: 'Google', description: 'Login with Google' });
    },
  },
  {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    onClick: () => {
      toast.add({ title: 'GitHub', description: 'Login with GitHub' });
    },
  },
];

const schema = z.object({
  email: z.email('Correo electrónico inválido'),
  password: z
    .string('La contraseña es requerida')
    .min(8, 'Debe tener al menos 8 caracteres'),
  remember: z.boolean().optional(),
});

type Schema = z.output<typeof schema>;

const onSubmit = async (payload: FormSubmitEvent<Schema>) => {
  const { email, password, remember } = payload.data;

  isPosting.value = true;
  if (remember) {
    cookieLoginEmail.value = email;
  } else {
    cookieLoginEmail.value = null;
  }

  const isSuccessful = await login(email, password);
  if (isSuccessful) {
    toast.add({ title: 'Éxito', description: 'Has iniciado sesión correctamente' });
  } else {
    toast.add({ title: 'Error', description: 'Credenciales inválidas', color: 'error' });
  }
  isPosting.value = false;
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        title="Iniciar sesión"
        description="Ingresa tus credenciales para acceder a tu cuenta."
        icon="i-lucide-user"
        :fields="fields"
        :providers="providers"
        :loading="isPosting"
        :disabled="isPosting"
        @submit="onSubmit"
        :ui="{
          leadingIcon: 'text-5xl',
        }"
      />
    </UPageCard>

    <UButton
      color="primary"
      variant="ghost"
      label="¿No tienes cuenta? Regístrate"
      to="/register"
    />
  </div>
</template>
