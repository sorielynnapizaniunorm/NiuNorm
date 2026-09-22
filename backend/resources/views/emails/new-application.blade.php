<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0" />
<title>New Application</title>
</head>
<body style="margin:0;padding:0;background:#0d0717;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0717;padding:40px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
      <tr>
        <td align="center" style="padding:40px 40px 28px;background:#1a1126;border-radius:20px 20px 0 0;border-bottom:1px solid rgba(244,239,230,0.08);">
          <img src="{{ url('images/NiunormLogo.png') }}" width="64" height="64" alt="Niunorm" style="border-radius:50%;display:block;margin:0 auto 16px;" />
          <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:#4ECDC4;">New Application Received</p>
          <h1 style="margin:0;font-size:30px;font-weight:900;text-transform:uppercase;color:#F4EFE6;letter-spacing:-0.01em;line-height:1.1;">{{ $application->brand_name }}</h1>
          <p style="margin:10px 0 0;font-size:13px;color:rgba(244,239,230,0.45);">Submitted {{ $application->created_at->format('F j, Y \a\t g:i A') }}</p>
        </td>
      </tr>
      <tr>
        <td style="background:#1a1126;padding:32px 40px;">
          <p style="margin:0 0 24px;font-size:14px;line-height:1.7;color:rgba(244,239,230,0.65);">A new brand has submitted an application to work with Niunorm. Review the details below and reach out within 48 hours.</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(244,239,230,0.08);border-radius:14px;overflow:hidden;margin-bottom:20px;">
            <tr><td colspan="2" style="padding:12px 20px 10px;font-size:9px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#4ECDC4;border-bottom:1px solid rgba(244,239,230,0.07);background:rgba(244,239,230,0.02);">Application Details</td></tr>
            @php
              $rows = [
                ['Contact', $application->contact_name],
                ['Email', $application->email],
                ['TikTok', $application->tiktok_handle ?: '—'],
                ['Monthly GMV', $application->monthly_gmv ?: '—'],
                ['Category', $application->category ?: '—'],
                ['Services', $application->services ? implode(', ', $application->services) : '—'],
                ['Referral', $application->referral ?: '—'],
              ];
            @endphp
            @foreach($rows as $i => [$label, $value])
            <tr style="background:transparent;">
              <td style="padding:11px 20px;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(244,239,230,0.38);white-space:nowrap;width:120px;border-bottom:1px solid rgba(244,239,230,0.05);">{{ $label }}</td>
              <td style="padding:11px 20px;font-size:13px;color:#F4EFE6;border-left:1px solid rgba(244,239,230,0.07);border-bottom:1px solid rgba(244,239,230,0.05);">
                @if($label === 'Email')
                  <a href="mailto:{{ $value }}" style="color:#F04B9A;text-decoration:none;">{{ $value }}</a>
                @else
                  {{ $value }}
                @endif
              </td>
            </tr>
            @endforeach
          </table>
          @if($application->message)
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr><td style="padding:16px 18px;background:rgba(240,75,154,0.06);border:1px solid rgba(240,75,154,0.18);border-left:3px solid #F04B9A;border-radius:10px;"><p style="margin:0 0 6px;font-size:9px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#F04B9A;">Message from Applicant</p><p style="margin:0;font-size:13px;line-height:1.65;color:rgba(244,239,230,0.7);">{{ $application->message }}</p></td></tr>
          </table>
          @endif
          <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center"><a href="mailto:{{ $application->email }}" style="display:inline-block;padding:14px 32px;background:#F04B9A;color:#130B1E;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.16em;text-decoration:none;border-radius:9999px;">Reply to {{ $application->contact_name }} →</a></td></tr></table>
        </td>
      </tr>
      <tr><td align="center" style="padding:20px 40px;background:#130b1e;border-radius:0 0 20px 20px;border-top:1px solid rgba(244,239,230,0.07);"><p style="margin:0;font-size:10px;color:rgba(244,239,230,0.25);letter-spacing:0.12em;text-transform:uppercase;">Niunorm &middot; Platinum TikTok Shop Partner &middot; Philippines</p></td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>
