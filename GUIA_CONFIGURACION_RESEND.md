# Guía de Activación de Correo Corporativo (Resend)
**Proyecto:** Landing Page LET INT US (`letintl.com`)  
**Destinatario:** `info@letintl.com`  
**Costo:** 100% Gratuito (Plan Free: hasta 3.000 correos al mes / 100 por día)

---

## 🎯 Objetivo
Habilitar el servicio seguro de envío automático para que cada vez que un cliente potencial complete el formulario de contacto en el sitio web, la notificación llegue de inmediato con el diseño corporativo a la bandeja de **`info@letintl.com`**.

---

## ⏱️ Fase 1: Creación de Cuenta y Clave de Conexión (2 minutos)

Sigue estos sencillos pasos:

### 1. Registrarse con el correo corporativo
1. Ingresa a la página oficial de registro: **[https://resend.com/signup](https://resend.com/signup)**
2. Escribe el correo oficial: **`info@letintl.com`** y asigna una contraseña segura.
3. Revisa la bandeja de entrada de `info@letintl.com`. Recibirás un correo de Resend con un código de verificación de 6 dígitos. Ingrésalo en la pantalla.

### 2. Generar la clave de API (API Key)
1. Una vez dentro de la plataforma, dirígete al menú lateral izquierdo y haz clic en **API Keys** (o ingresa directo a [https://resend.com/api-keys](https://resend.com/api-keys)).
2. Haz clic en el botón negro superior **"Create API Key"**.
3. Completa los campos de la ventana:
   * **Name:** `Website LetInt Production`
   * **Permission:** `Full access`
   * **Domain:** `All domains`
4. Haz clic en **"Add"**.
5. Aparecerá en pantalla una clave secreta que inicia con `re_...` (ejemplo: `re_123456789...`).
6. **Copia esa clave y compártela con el desarrollador.**  
   > *Nota de seguridad:* Resend solo muestra esta clave una vez por protección. Si la pierdes, simplemente se genera otra.

---

## 🚀 ¿Qué sucede después de entregar la clave?
Con este paso, el sitio web queda **100% operativo**. Cada solicitud de cotización o contacto llegará de inmediato a `info@letintl.com` con el remitente de servicio `LET INT US <onboarding@resend.dev>`. 

Además, al presionar **"Responder"** en el correo que recibas, le estarás respondiendo directamente al correo del prospecto.

---

## 🌐 Fase 2 (Opcional): Personalizar el Remitente Oficial con su Dominio

Si en lugar de `onboarding@resend.dev` prefieren que el remitente diga exactamente `LET INT US <contact@letintl.com>`, se puede vincular el dominio siguiendo estos pasos:

1. En el panel de Resend, ve a **[Domains](https://resend.com/domains)** y haz clic en **"Add Domain"**.
2. Escribe el dominio: `letintl.com` y selecciona la región `us-east-1`.
3. Resend te mostrará **3 registros DNS** en una tabla:
   * **DKIM:** Es un registro de tipo **`TXT`** (en el selector de tipo de tu DNS eliges **TXT**).
   * **SPF:** Es otro registro de tipo **`TXT`**.
   * **MX:** Es un registro de tipo **`MX`** (con prioridad `10`).

   | En Resend se llama | Tipo en tu panel DNS | Nombre / Host | Valor / Contenido |
   | :--- | :---: | :--- | :--- |
   | **DKIM** | **`TXT`** | `resend._domainkey` | *(El texto largo que te da Resend)* |
   | **SPF** | **`TXT`** | `bounces` | `v=spf1 include:amazonses.com ~all` |
   | **MX** | **`MX`** (Prioridad 10) | `bounces` | `feedback-smtp.us-east-1.amazonses.com` |

   > **💡 Nota importante sobre el Nombre/Host:**  
   > Algunos paneles como Cloudflare o cPanel solo requieren poner `resend._domainkey` y `bounces` (ellos completan el resto automáticamente). Otros proveedores antiguos te piden el nombre completo: `resend._domainkey.letintl.com`. Si dudas, copia el valor exacto que da Resend.

4. Ingresa al panel donde administras el dominio (Cloudflare, GoDaddy, Namecheap, cPanel, etc.) y añade esos registros en la **Zona DNS**.
5. Haz clic en **"Verify DNS Records"** en Resend.
6. Una vez verificado (estado en verde), notifícalo al equipo técnico para cambiar el remitente a `contact@letintl.com`.

---

*Cualquier inquietud durante el proceso, puedes contactar al equipo de desarrollo.*
